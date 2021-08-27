import client from '../Utils/client';

import { getParams, isNull } from '../Utils';

const expTime = 3600 * 1000;

const setTimeStamp = () =>
	window.localStorage.setItem('spotify_timestamp', Date.now());
const setAccessToken = (token) => {
	if (token) {
		setTimeStamp();
	}
	window.localStorage.setItem('spotify_access_token', token);
};
const setRefreshToken = (token) =>
	window.localStorage.setItem('spotify_refresh_token', token);

export const refreshAccessToken = async () => {
	if (!isNull(getRefreshToken())) {
		try {
			const { data } = await client.get(
				`/api/refresh_token?refresh_token=${getRefreshToken()}`
			);
			const { access_token } = data;

			setAccessToken(access_token);
			window.location.reload();
			return;
		} catch (e) {
			console.error(e);
		}
	}
};

const getTokenTimestamp = () =>
	window.localStorage.getItem('spotify_timestamp');
const getAccessToken = () =>
	window.localStorage.getItem('spotify_access_token');
const getRefreshToken = () =>
	window.localStorage.getItem('spotify_refresh_token');

export const receieveAccessToken = () => {
	const { accessToken, refreshToken } = getParams();

	var localAccessToken = getAccessToken();
	var localRefreshToken = getRefreshToken();

	if (
		isNull(accessToken) &&
		isNull(refreshToken) &&
		isNull(localAccessToken) &&
		isNull(localRefreshToken)
	) {
		return null;
	}

	if (Date.now() - getTokenTimestamp() > expTime) {
		console.log('Acess token expired, refreshing to get new one');
		refreshAccessToken();
	}

	if (isNull(localRefreshToken)) {
		setRefreshToken(refreshToken);
	}

	if (isNull(localAccessToken)) {
		setAccessToken(accessToken);
		return accessToken;
	}

	console.log(`${localAccessToken} LOCAL ACCESS TOKEN`);

	return localAccessToken;
};

export const token = receieveAccessToken();

export const logout = () => {
	window.localStorage.removeItem('spotify_timestamp');
	window.localStorage.removeItem('spotify_access_token');
	window.localStorage.removeItem('spotify_refresh_token');
	window.location.href = '/';
};

export const createAndSavePlaylist = async (id, name, playlist, profile) => {
	const response = await createPlaylist(id, name, profile);
	if (response.status === 200) {
		const r = await addSongsToPlaylist(response.data.id, playlist);
		if (r.status === 200) {
			return true;
		}
	}
	return false;
};

const createPlaylist = async (id, name, profile) =>
	await client.post(
		`/api/create_playlist?id=${id}&name=${name}&profile=${profile}`
	);

const addSongsToPlaylist = async (newID, playlist) => {
	const uris = playlist.tracks.map((item) => item.uri).join(',');

	return await client.post(`/api/add_to_playlist?id=${newID}&uris=${uris}`);
};

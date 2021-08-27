import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import ProfilePage from './ProfilePage';

const Profile = () => {
	const [profile, setProfile] = useState();
	const [profilePlaylists, setProfilePlaylists] = useState();
	const [following, setFollowing] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [currentUser, setCurrentUser] = useState();
	const { id } = useParams();

	const getProfile = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(`/api/profile?id=${id}`);
				setProfile(data.body);
			}
		},
		[currentToken]
	);

	const getProfilePlaylists = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(
					`/api/profile_playlists?id=${id}`
				);
				setProfilePlaylists(data.body);
			}
		},
		[currentToken]
	);

	const getFollowing = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(
					`/api/follow?id=${id}&type=user`
				);
				setFollowing(data[0]);
			}
		},
		[currentToken]
	);

	const getCurrentUser = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(`/api/current_profile/`);
			setCurrentUser(data.body);
		}
	}, [currentToken]);

	useEffect(() => {
		setCurrentToken(token);
		getProfile(id);
		getProfilePlaylists(id);
		getFollowing(id);
		getCurrentUser();
	}, [
		currentToken,
		getCurrentUser,
		getFollowing,
		getProfile,
		getProfilePlaylists,
		id,
	]);

	return (
		<div>
			{isNull(profile) ||
			isNull(profilePlaylists) ||
			isNull(following) ||
			isNull(currentUser) ? (
				<Loader />
			) : (
				<ProfilePage
					following={following}
					currentUser={currentUser}
					profile={profile}
					playlists={profilePlaylists}
				/>
			)}
		</div>
	);
};

export default Profile;

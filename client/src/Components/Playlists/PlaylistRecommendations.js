import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import RecommendTable from './RecommendTable';

const PlaylistRecommendations = () => {
	const [playlist, setPlaylist] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [currentUser, setCurrentUser] = useState();
	const { id, name } = useParams();

	const getPlaylistRecommendation = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(
					`/api/playlist_recommendation?id=${id}`
				);
				setPlaylist(data);
			}
		},
		[currentToken]
	);

	const getCurrentUser = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get('/api/current_profile/');
			setCurrentUser(data.body);
		}
	}, [currentToken]);

	useEffect(() => {
		setCurrentToken(token);
		getPlaylistRecommendation(id);
		getCurrentUser();
	}, [setCurrentToken, getPlaylistRecommendation, id, getCurrentUser]);

	return (
		<div>
			{!isNull(playlist) && !isNull(currentUser) ? (
				<RecommendTable
					id={currentUser.id}
					playlist={playlist}
					name={name}
					profile={false}
				/>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default PlaylistRecommendations;

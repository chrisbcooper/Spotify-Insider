import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import RecentlyPlayedTable from './RecentlyPlayedTable';
import Loader from '../Parts/Loader';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

const RecentlyPlayedSongs = () => {
	const [musicHistory, setMusicHistory] = useState();
	const [currentToken, setCurrentToken] = useState('');

	const getMusic = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get('/api/recently_played_songs/');
			setMusicHistory(data.musicHistory);
		}
	}, [currentToken]);

	useEffect(() => {
		setCurrentToken(token);
		getMusic();
	}, [setCurrentToken, getMusic]);

	return (
		<div>
			<h3>Recently Played Songs</h3>
			{!isNull(musicHistory) ? (
				<RecentlyPlayedTable list={musicHistory} />
			) : (
				<Loader />
			)}
		</div>
	);
};

export default RecentlyPlayedSongs;

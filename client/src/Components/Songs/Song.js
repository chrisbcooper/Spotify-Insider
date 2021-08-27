import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import SongPage from './SongPage';

const Song = () => {
	const [song, setSong] = useState();
	const [songAudioFeatures, setSongAudioFeatures] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [dataAvailable, setDataAvailable] = useState();
	const { id } = useParams();

	const getSong = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(`/api/song?id=${id}`);
				setSong(data.body);
			}
		},
		[currentToken]
	);

	const getSongAudioFeatures = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			var counter = 0;
			if (currentToken) {
				while (counter < 10) {
					const { data } = await client.get(
						`/api/song_audio_features?id=${id}`
					);
					if (isNull(data)) {
						counter++;
					} else {
						setDataAvailable(true);
						setSongAudioFeatures(data);
						break;
					}
				}
			}
			if (counter === 10) {
				setDataAvailable(false);
			}
		},
		[currentToken]
	);

	useEffect(() => {
		setCurrentToken(token);
		getSong(id);
		getSongAudioFeatures(id);
	}, [id, getSong, getSongAudioFeatures]);

	return (
		<div className='center'>
			{isNull(song) ||
			isNull(songAudioFeatures) ||
			isNull(dataAvailable) ? (
				<Loader />
			) : (
				<SongPage
					song={song}
					dataAvailable={dataAvailable}
					songAudioFeatures={songAudioFeatures}
				/>
			)}
		</div>
	);
};

export default Song;

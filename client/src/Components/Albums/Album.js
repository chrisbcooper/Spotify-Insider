import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import AlbumPage from './AlbumPage';

const Album = () => {
	//THERE ARE MORE SONG ENDPOINTS

	const [album, setAlbum] = useState();
	const [currentToken, setCurrentToken] = useState('');

	const getAlbum = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(`/api/album?id=${id}`);
				setAlbum(data.body);
			}
		},
		[currentToken]
	);

	const { id } = useParams();

	useEffect(() => {
		setCurrentToken(token);
		getAlbum(id);
	}, [currentToken, getAlbum, id]);

	return (
		<div>{isNull(album) ? <Loader /> : <AlbumPage album={album} />}</div>
	);
};

export default Album;

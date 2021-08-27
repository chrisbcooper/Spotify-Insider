import React, { useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import ArtistPage from './ArtistPage';

const Artist = () => {
	const [artist, setArtist] = useState();
	const [albums, setAlbums] = useState();
	const [relatedArtists, setRelatedArtists] = useState();
	const [topTracks, setTopTracks] = useState();
	const [following, setFollowing] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const { id } = useParams();

	useEffect(() => {
		setCurrentToken(token);
		getArtist(id);
		getAlbums(id);
		getRelatedArtists(id);
		getTopTracks(id);
		getFollowing(id);
	}, [currentToken]);

	const getArtist = async (id) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(`/api/artist?id=${id}`);
			setArtist(data.body);
		}
	};

	const getAlbums = async (id) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(`/api/artist_albums?id=${id}`);
			setAlbums(data.body);
		}
	};

	const getRelatedArtists = async (id) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(
				`/api/artist_related_artists?id=${id}`
			);
			setRelatedArtists(data.body);
		}
	};

	const getTopTracks = async (id) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(
				`/api/artist_top_tracks?id=${id}`
			);
			setTopTracks(data.body);
		}
	};

	const getFollowing = async (id) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(
				`/api/follow?id=${id}&type=artist`
			);
			setFollowing(data[0]);
		}
	};

	return (
		<div>
			{isNull(artist) ||
			isNull(following) ||
			isNull(albums) ||
			isNull(relatedArtists) ||
			isNull(topTracks) ? (
				<Loader />
			) : (
				<ArtistPage
					albums={albums}
					artist={artist}
					topTracks={topTracks}
					following={following}
					relatedArtists={relatedArtists}
				/>
			)}
		</div>
	);
};

export default Artist;

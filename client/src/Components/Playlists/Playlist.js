import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';
import { useParams } from 'react-router-dom';
import { Checkmark } from 'react-checkmark';

import { token } from '../../Spotify';
import { isNull } from '../../Utils';

import Loader from '../Parts/Loader';
import PlaylistTable from './PlaylistTable';

const Playlist = () => {
	const [playlist, setPlaylist] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [follow, setFollow] = useState();
	const { id } = useParams();

	const getPlaylist = useCallback(
		async (id) => {
			setAuthToken(currentToken);
			if (currentToken) {
				const { data } = await client.get(`/api/playlist?id=${id}/`);
				setPlaylist(data.playlist);
			}
		},
		[currentToken]
	);

	const getFollow = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			var response = await client.get('/api/current_profile/');
			var user = response.data.body.id;
			const { data } = await client.get(
				`/api/follow_playlist?id=${id}&user=${user}/`
			);
			setFollow(data[0]);
		}
	}, [currentToken, id]);

	useEffect(() => {
		setCurrentToken(token);
		getPlaylist(id);
		getFollow();
	}, [currentToken, getFollow, getPlaylist, id]);

	const clickFollow = async () => {
		setAuthToken(currentToken);

		if (currentToken) {
			const { data } = await client.put(`/api/follow_playlist?id=${id}`);
			if (data === 'success') {
				setFollow(true);
			}
		}
	};

	const clickUnfollow = async () => {
		setAuthToken(currentToken);

		if (currentToken) {
			const { data } = await client.delete(
				`/api/unfollow_playlist?id=${id}`
			);
			if (data === 'success') {
				setFollow(false);
			}
		}
	};

	return (
		<div>
			{!isNull(playlist) ? (
				<div className='playlist-header'>
					<h2>{playlist.name}</h2>
					<img
						src={`${playlist.images[0].url}`}
						className='playlist-page-pic'
						style={{ marginBottom: '20px' }}
						alt=''
					/>
					<a href={`/profile/${playlist.owner.id}`}>
						<p>By: {playlist.owner.display_name}</p>
					</a>
					<p>{playlist.description}</p>
					<p>{playlist.tracks.total} Tracks</p>
					{follow ? (
						<div className='playlist-follow'>
							<div
								onClick={clickUnfollow}
								className='playlist-created'
							>
								<Checkmark size={20} />{' '}
								<p style={{ marginLeft: '10px' }}>Following</p>
							</div>
						</div>
					) : (
						<button
							onClick={clickFollow}
							className='btn playlist-btn'
						>
							Follow
						</button>
					)}
					<a
						className='btn login-btn'
						style={{ marginTop: '0' }}
						href={`/playlist_recommendations/${playlist.id}/${playlist.name}`}
					>
						Get Recommended Playlist
					</a>
					<PlaylistTable playlist={playlist} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Playlist;

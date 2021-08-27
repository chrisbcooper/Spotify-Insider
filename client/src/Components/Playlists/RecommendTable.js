import React, { useEffect, useState } from 'react';
import { Checkmark } from 'react-checkmark';

import { isNull } from '../../Utils';
import { createAndSavePlaylist } from '../../Spotify';

const RecommendTable = ({ playlist, name, id, profile }) => {
	const [created, setCreated] = useState(false);

	useEffect(() => {
		if (isNull(playlist)) {
			return '';
		}
	}, [playlist]);

	const TableItem = (item, index) => {
		var seconds = Math.floor(item.duration_ms / 1000);
		var minutes = Math.floor(seconds / 60);
		seconds = seconds - 60 * minutes;
		seconds = seconds > 10 ? seconds : `0${seconds}`;

		return (
			<li key={index}>
				<a className='link-in-list' href={`/song/${item.id}`}>
					<span className='table-pic-span'>
						<img
							className='playlist-pic'
							src={`${item.album.images[0].url}`}
							alt='al'
						/>
					</span>
					<div className='name-and-time'>
						<div className='left wrap'>
							<p>{item.name}</p>
							<p>
								{item.artists[0].name} <span>&#183;</span>{' '}
								{item.album.name}
							</p>
						</div>
						<div>{`${minutes}:${seconds}`}</div>
					</div>
				</a>
			</li>
		);
	};

	const createPlaylist = async () => {
		const res = createAndSavePlaylist(id, name, playlist, profile);
		setCreated(res);
	};

	return (
		<div>
			<div className='header'>
				<h3>Recommended {profile ? 'Songs' : `Based on: ${name}`}</h3>
				{created ? (
					<div className='playlist-created'>
						<Checkmark size={20} />{' '}
						<p style={{ marginLeft: '10px' }}>Playlist Created</p>
					</div>
				) : (
					<div>
						<button
							onClick={createPlaylist}
							className='btn login-btn'
							type='button'
						>
							Save to Spotify
						</button>
					</div>
				)}
			</div>
			<div className='playlist-songs'>
				<div style={{ marginTop: '30px' }}>
					<ol>
						{playlist.tracks.map((item, index) =>
							TableItem(item, index)
						)}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default RecommendTable;

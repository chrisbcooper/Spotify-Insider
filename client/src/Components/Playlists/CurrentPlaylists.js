import React, { useCallback, useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';

import { token } from '../../Spotify';

import CurrentPlaylistsTable from './CurrentPlaylistsTable';
import Loader from '../Parts/Loader';
import { isNull } from '../../Utils';

const CurrentPlaylists = () => {
	const [currentPlaylists, setCurrentPlaylists] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [currentList, setCurrentList] = useState('all');
	const [userProfile, setUserProfile] = useState();

	const getPlaylists = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(`/api/current_playlists/`);
			setCurrentPlaylists(data.current_playlists);
		}
	}, [currentToken]);

	const getUser = useCallback(async () => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get('/api/current_profile/');
			setUserProfile(data.body);
		}
	}, [currentToken]);

	useEffect(() => {
		setCurrentToken(token);
		getPlaylists();
		getUser();
	}, [currentToken, getPlaylists, getUser]);

	const changeList = (e) => {
		e.preventDefault();
		setCurrentList(e.target.name);
	};

	var leftClassName = `btn button-in-group ${
		currentList === 'all' ? 'selected' : ''
	}`;
	var middleClassName = `btn button-in-group ${
		currentList === 'mine' ? 'selected' : ''
	}`;
	var rightClassName = `btn button-in-group far-right-button ${
		currentList === 'other' ? 'selected' : ''
	}`;

	return (
		<div>
			<div className='header'>
				<h3>Playlists</h3>
				<div className='btn-group' role='group'>
					<button
						onClick={changeList}
						type='button'
						name='all'
						className={leftClassName}
					>
						All
					</button>
					<button
						onClick={changeList}
						type='button'
						name='mine'
						className={middleClassName}
					>
						My Playlists
					</button>
					<button
						onClick={changeList}
						type='button'
						name='other'
						className={rightClassName}
					>
						Other Playlists
					</button>
				</div>
			</div>
			{!isNull(currentPlaylists) && !isNull(userProfile) ? (
				<CurrentPlaylistsTable
					user={userProfile}
					filter={currentList}
					list={currentPlaylists}
				/>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default CurrentPlaylists;

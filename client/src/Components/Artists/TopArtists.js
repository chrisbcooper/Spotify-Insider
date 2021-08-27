import React, { useEffect, useState } from 'react';
import client, { setAuthToken } from '../../Utils/client';

import { token } from '../../Spotify';

import TopArtistsTable from './TopArtistsTable';
import Loader from '../Parts/Loader';
import { isNull } from '../../Utils';

const TopArtists = () => {
	const [topArtists, setTopArtists] = useState();
	const [currentToken, setCurrentToken] = useState('');
	const [currentTerm, setCurrentTerm] = useState('short');

	useEffect(() => {
		setCurrentToken(token);
		getArtists(currentTerm);
	}, [currentToken, currentTerm]);

	const getArtists = async (term) => {
		setAuthToken(currentToken);
		if (currentToken) {
			const { data } = await client.get(`/api/top_artists?term=${term}`);
			setTopArtists(data.topArtists);
		}
	};

	const changeList = (e) => {
		e.preventDefault();
		setCurrentTerm(e.target.name);
	};

	var leftClassName = `btn button-in-group ${
		currentTerm === 'short' ? 'selected' : ''
	}`;
	var middleClassName = `btn button-in-group ${
		currentTerm === 'medium' ? 'selected' : ''
	}`;
	var rightClassName = `btn button-in-group far-right-button ${
		currentTerm === 'long' ? 'selected' : ''
	}`;

	return (
		<div>
			<div className='header'>
				<h3>Most Played Artists</h3>
				<div className='btn-group' role='group'>
					<button
						onClick={changeList}
						type='button'
						name='short'
						className={leftClassName}
					>
						Last 4 Weeks
					</button>
					<button
						onClick={changeList}
						type='button'
						name='medium'
						className={middleClassName}
					>
						Last 6 Months
					</button>
					<button
						onClick={changeList}
						type='button'
						name='long'
						className={rightClassName}
					>
						All Time
					</button>
				</div>
			</div>
			{!isNull(topArtists) ? (
				<TopArtistsTable list={topArtists} />
			) : (
				<Loader />
			)}
		</div>
	);
};

export default TopArtists;

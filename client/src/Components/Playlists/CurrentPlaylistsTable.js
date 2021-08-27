import React, { useEffect } from 'react';

const CurrentPlaylistsTable = ({ list, filter, user }) => {
	useEffect(() => {
		if (list.length <= 2) {
			return '';
		}
	}, [list.length]);

	const GridItem = (item, index) => {
		if (filter !== 'all') {
			if (filter === 'mine') {
				if (item.owner.id !== user.id) {
					return '';
				}
			} else {
				if (item.owner.id === user.id) {
					return '';
				}
			}
		}
		return (
			<div key={index} className='col-lg-3 col-md-4 col-sm-6 artist-col'>
				<a href={`/playlist/${item.id}`}>
					<img
						className='playlist-page-pic'
						src={`${item.images[0].url}`}
						alt='al'
					/>
					<p style={{ margin: '10px' }}>{item.name}</p>
				</a>
			</div>
		);
	};

	return (
		<div>
			<div className='row'>
				{list.map((item, index) => GridItem(item, index))}
			</div>
		</div>
	);
};

export default CurrentPlaylistsTable;

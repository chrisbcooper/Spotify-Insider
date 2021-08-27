import React, { useEffect } from 'react';

const TopGenresList = ({ list }) => {
	useEffect(() => {
		if (list.length <= 2) {
			return '';
		}
	}, [list.length]);

	const GridItem = (item, index) => {
		return (
			<div className='genre-list-div'>
				<h4>
					{index + 1}) {item[0]}
				</h4>
			</div>
		);
	};

	return (
		<div style={{ marginBottom: '75px' }}>
			{list.map((item, index) => GridItem(item, index))}
		</div>
	);
};

export default TopGenresList;

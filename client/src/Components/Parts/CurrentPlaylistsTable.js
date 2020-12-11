import React, { useEffect } from 'react';

const CurrentPlaylistsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
  },[]);

  const GridItem = (item, index) => {

      return (
          <div className='col' key={index}>
            <a href={`/playlist/${item.id}`}><img src={`${item.images[0].url}`} className='playlist-pic' alt=""/></a>
            <p>{item.name}</p>
          </div>
      );
  };


    
  return (
        <div className='container'>
            <div className="row">
                {list.map( (item, index) => GridItem(item, index))}
            </div>
        </div>
      );
};

export default CurrentPlaylistsTable;

import React, { useEffect } from 'react';

const ArtistAlbums = ({albums, all}) => {

  useEffect(() => {
    if(albums.length <= 2) {
      return '';
    }
  },[]);

  const GridItem = (item, index) => {

    if(!all) {
        if(index > 7) {
            return '';
        }
    }

    return (
    <div key={index} className='col-lg-3 col-md-4 col-sm-6 artist-album-col'>
      <a href={`/album/${item.id}`}>
          <img className='playlist-page-pic' src={`${item.images[0].url}`} alt="al"/>
          <p style={{margin: '10px'}} className='album-name' >{item.name}</p>
      </a>
    </div>
    );
      
  };


    
  return (
    <div className="row">
        {albums.map( (item, index) => GridItem(item, index))}
    </div>
      );
};

export default ArtistAlbums;

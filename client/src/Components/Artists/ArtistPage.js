import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const ArtistPage = ({artist, relatedArtists, topTracks, albums}) => {

  useEffect(() => {
    if(isNull(artist)) {
        return '';
    }
    console.log(artist);
    console.log(albums);
    console.log(relatedArtists);
    console.log(topTracks);
  },[]);

    
  return (
    <div>
        <h1>{artist.name}</h1>
        <img src={`${artist.images[0].url}`} alt="" className='profile-pic'/>
    </div>
      );
};

export default ArtistPage;

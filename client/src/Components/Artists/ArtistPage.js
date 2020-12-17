import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const ArtistPage = ({artist}) => {

  useEffect(() => {
    if(isNull(artist)) {
        return '';
    }
    console.log(artist);
  },[]);

    
  return (
    <div>
        <h1>{artist.name}</h1>
        <img src={`${artist.images[2].url}`} alt="" className='profile-pic'/>
    </div>
      );
};

export default ArtistPage;

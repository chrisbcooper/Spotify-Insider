import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const SongPage = ({song}) => {

  useEffect(() => {
    if(isNull(song)) {
        return '';
    }
    console.log(song);
  },[]);

    
  return (
    <div>
        <h1>{song.name}</h1>
        <img src={`${song.album.images[0].url}`} alt="" class='playlist-page-pic'/>
        <h3>By: <a href={`/artist/${song.artists[0].id}`}>{song.artists[0].name}</a></h3>
        <p>Relased: {song.album.release_date}</p>
    </div>
      );
};

export default SongPage;

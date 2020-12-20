import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const AlbumPage = ({album}) => {

  useEffect(() => {
    if(isNull(album)) {
        return '';
    }
    console.log(album);
  },[]);

  const TableItem = (item, index) => {

    console.log(item);

    var seconds = Math.floor(item.duration_ms / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds - (60 * minutes);
    seconds = seconds > 10 ? seconds : `0${seconds}`;


    return (
    <li key={index}>
      <a className='link-in-list' href={`/song/${item.id}`}>
        <div className='name-and-time'>
            <p>{item.name}</p>  
        </div>
        <p className='right'>{`${minutes}:${seconds}`}</p>
      </a>
    </li>)
};


  
return (
  <div className='playlist-songs'>
    <img src={`${album.images[0].url}`} className='playlist-page-pic' alt=""/>
    <h2 className='artist-name' >{album.name}</h2>
    <p>{album.tracks.total} Tracks</p>
    <div style={{marginTop: '30px'}}>
      <ol>
        {album.tracks.items.map((item, index) => TableItem(item, index))}
      </ol>
    </div>
  </div>
    );
};

export default AlbumPage;

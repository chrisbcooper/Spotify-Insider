import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const PlaylistTable = ({playlist}) => {

  useEffect(() => {
    if(isNull(playlist)) {
        return '';
    }
    console.log(playlist);
  },[]);

  const TableItem = (item, index) => {

    var seconds = Math.floor(item.track.duration_ms / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds - (60 * minutes);
    seconds = seconds > 10 ? seconds : `0${seconds}`;


    return (
    <li key={index}>
      <a className='link-in-list' href={`/song/${item.track.id}`}>
        <span className='table-pic-span'>
          <img className='playlist-pic' src={`${item.track.album.images[0].url}`} alt="al"/>
        </span>
        <div className='name-and-time'>
          <div className='left wrap'>
            <p>{item.track.name}</p>
            <p>{item.track.artists[0].name} <span>&#183;</span> {item.track.album.name}</p>
          </div>
          <div>
            {`${minutes}:${seconds}`}
          </div>
        </div>
      </a>
    </li>)
};


  
return (
  <div className='playlist-songs'>
    <h2>{playlist.name}</h2>
    <img src={`${playlist.images[0].url}`} className='playlist-page-pic' style={{marginBottom: '20px'}}  alt=""/>
    <a href={`/profile/${playlist.owner.id}`}><p>By: {playlist.owner.display_name}</p></a>
    <p>{playlist.description}</p>
    <p>{playlist.tracks.total} Tracks</p>
    <div style={{marginTop: '30px'}}>
      <ol>
        {playlist.tracks.items.map((item, index) => TableItem(item, index))}
      </ol>
    </div>
  </div>
    );
};

export default PlaylistTable;

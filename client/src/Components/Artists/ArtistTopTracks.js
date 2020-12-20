import React, { useEffect } from 'react';

const ArtistTopTracks = ({list, all}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[list.length]);

  const TableItem = (item, index) => {

    if(!all) {
        if(index > 4) {
            return '';
        }
    }

    var seconds = Math.floor(item.duration_ms / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds - (60 * minutes);
    seconds = seconds > 10 ? seconds : `0${seconds}`;


    return (
    <li key={index}>
      <a className='link-in-list' href={`/song/${item.id}`}>
        <span className='table-pic-span'>
          <img className='playlist-pic' src={`${item.album.images[0].url}`} alt="al"/>
        </span>
        <div className='name-and-time'>
          <div className='left wrap'>
            <p>{item.name}</p>
            <p>{item.artists[0].name} <span>&#183;</span> {item.album.name}</p>
          </div>
          <div>
            {`${minutes}:${seconds}`}
          </div>
        </div>
      </a>
    </li>)
};


  
return (
  <div style={{marginTop: '30px'}}>
    <ol>
      {list.map((item, index) => TableItem(item, index))}
    </ol>
  </div>
    );
};

export default ArtistTopTracks;

import React, { useEffect } from 'react';

import {milliToSeconds} from '../../Utils';

const TopSongsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
  },[list.length]);

  const TableItem = (item, index) => {



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
            {milliToSeconds(item.duration_ms)}
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

export default TopSongsTable;

import React, { useEffect } from 'react';

const RecentlyPlayedTable = ({list}) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[]);

  const TableItem = (item, index) => {
      const date = new Date(item.played_at);

      var hours = date.getHours();
      var m = 'am';
      if(hours > 12) {
        hours -= 12;
        m = 'pm';
      }
      var minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
      return (
      <li key={item.played_at}>
        <a className='link-in-list' href={`/song/${item.track.id}`}>
          <span className='table-pic-span'>
            <img className='playlist-pic' src={`${item.track.album.images[0].url}`} alt="al"/>
          </span>
          <div className='name-and-time'>
            <div className='left wrap '>
              <p >{item.track.name}</p>
              <p>{item.track.artists[0].name} <span>&#183;</span> {item.track.album.name}</p>
            </div>
            <div>
              {`${date.getDate()} ${months[date.getMonth()]}, ${hours}:${minutes}${m}`}
            </div>
          </div>
        </a>
      </li>)
  };


    
  return (
    <div style={{marginTop: '30px'}}>
      <ul>
        {list.map((item, index) => TableItem(item, index))}
      </ul>
    </div>
      );
};

export default RecentlyPlayedTable;

import React, { useEffect } from 'react';

const RecentlyPlayedTable = ({list}) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
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
      return (<tr key={item.played_at}>
          <td><a href={`/song/${item.track.id}`}><img src={`${item.track.album.images[2].url}`} alt="al"/></a></td>
          <td className='left' >{item.track.name}</td>
          <td>{`${date.getDate()} ${months[date.getMonth()]}, ${hours}:${minutes}${m}`}</td>
      </tr>)
  };


    
  return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Song Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
                {list.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
        </div>
      );
};

export default RecentlyPlayedTable;

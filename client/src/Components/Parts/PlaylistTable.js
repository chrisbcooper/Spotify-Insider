import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const PlaylistTable = ({playlist}) => {

  useEffect(() => {
    if(isNull(playlist)) {
        return '';
    }
  },[]);

  const TableItem = (item, index) => {
    return (<tr key={index}>
        <td>#{index + 1}</td>
        <td><img src={`${item.track.album.images[2].url}`} alt="al"/></td>
        <td >{item.track.name}</td>
    </tr>)
};


    
  return (
    <div>
        <h1>{playlist.name}</h1>
        <img src={`${playlist.images[0].url}`} alt="" className='playlist-page-pic'/>
        <h1>Created by <a href={`/profile/${playlist.owner.id}`}>{playlist.owner.display_name}</a></h1>
        <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Album </th>
                <th>Song Title</th>
              </tr>
            </thead>
            <tbody>
                {playlist.tracks.items.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
    </div>
      );
};

export default PlaylistTable;

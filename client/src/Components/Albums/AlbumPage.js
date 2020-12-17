import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

const AlbumPage = ({album}) => {

  useEffect(() => {
    if(isNull(album)) {
        return '';
    }
    console.log(album)
  },[]);

  const TableItem = (item, index) => {
    return (<tr key={index}>
        <td>#{index + 1}</td>
        <td><a href={`/song/${item.id}`}>{item.name}</a></td>
    </tr>)
};

    
  return (
    <div>
        <h1>{album.name}</h1>
        <img src={`${album.images[0].url}`} alt="" className='playlist-page-pic'/>
        <h1>By: {album.artists.map((item) => (<p><a href={`/artist/${item.id}`}>{item.name}</a></p>))}</h1>
        <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Song Title</th>
              </tr>
            </thead>
            <tbody>
                {album.tracks.items.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
    </div>
      );
};

export default AlbumPage;

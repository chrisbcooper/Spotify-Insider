import React, { useEffect } from 'react';

const TopSongsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
  },[list.length]);

  const TableItem = (item, index) => {
      return (<tr key={index}>
          <td>#{index + 1}</td>
          <td><img src={`${item.album.images[2].url}`} alt="al"/></td>
          <td >{item.name}</td>
      </tr>)
  };


    
  return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Album </th>
                <th>Song Title</th>
              </tr>
            </thead>
            <tbody>
                {list.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
        </div>
      );
};

export default TopSongsTable;

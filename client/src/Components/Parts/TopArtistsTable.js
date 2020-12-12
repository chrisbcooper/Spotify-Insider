import React, { useEffect } from 'react';

const TopArtistsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[list.length]);

  const TableItem = (item, index) => {
      return (<tr key={index}>
          <td>#{index + 1}</td>
          <td><a href={`/artist/${item.id}`}><img src={`${item.images[2].url}`} alt="al"/></a></td>
          <td ><a href={`/artist/${item.id}`}>{item.name}</a></td>
      </tr>)
  };


    
  return (
        <div>
          <table className="table">
            <tbody>
                {list.map((item, index) => TableItem(item, index))}
            </tbody>
          </table>
        </div>
      );
};

export default TopArtistsTable;

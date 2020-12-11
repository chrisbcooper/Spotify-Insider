import React, { useEffect } from 'react';

const TopArtistsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
  },[list.length]);

  const TableItem = (item, index) => {
      return (<tr key={index}>
          <td>#{index + 1}</td>
          <td><img src={`${item.images[2].url}`} alt="al"/></td>
          <td >{item.name}</td>
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

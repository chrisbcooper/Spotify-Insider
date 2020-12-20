import React, { useEffect } from 'react';

const TopSongsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[list.length]);

  const TableItem = (item, index) => {
    return (
    <li key={index}>
      <a className='link-in-list' href={`/song/${item.id}`}>
        <span className='table-pic-span'>
          <img src={`${item.album.images[2].url}`} alt="al"/>
        </span>
        <div className='name-and-time'>
          <div className='left'>
            {item.name}
          </div>
          <div>
            {item.duration_ms}
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

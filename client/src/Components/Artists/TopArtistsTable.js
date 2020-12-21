import React, { useEffect } from 'react';

const TopArtistsTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[list.length]);

  const TableItem = (item, index) => {
    return (
      <div key={index} className='col-lg-3 col-md-4 col-sm-6 artist-col'>
        <a href={`/artist/${item.id}`}>
            <img className='top-artist-pic' src={`${item.images[0].url}`} alt="al"/>
            <p style={{margin: '10px'}}>{item.name}</p>
        </a>
    </div>)
};


  
return (
  <div style={{marginTop: '30px'}} className='artist-grid'>
    <div className="row">
      {list.map((item, index) => TableItem(item, index))}
    </div>
  </div>
    );
};

export default TopArtistsTable;

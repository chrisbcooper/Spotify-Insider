import React, { useEffect } from 'react';

const ProfilePlaylistTable = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
  },[]);

  const GridItem = (item, index) => {

    return (
    <div key={index} className='col-lg-3 col-md-4 col-sm-6 artist-col'>
      <a href={`/playlist/${item.id}`}>
          <img className='playlist-page-pic' src={`${item.images[0].url}`} alt="al"/>
          <p style={{margin: '10px'}}>{item.name}</p>
      </a>
    </div>
    );
      
  };


    
  return (
        <div>
            <div className="row">
                {list.map( (item, index) => GridItem(item, index))}
            </div>
        </div>
      );
};

export default ProfilePlaylistTable;

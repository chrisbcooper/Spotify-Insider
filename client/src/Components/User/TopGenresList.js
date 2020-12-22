import React, { useEffect } from 'react';

const TopGenresList = ({list}) => {

  useEffect(() => {
    if(list.length <= 2) {
      return '';
    }
    console.log(list);
  },[]);

  const GridItem = (item, index) => {

    return (
        <div className='genre-list-div' >
            <h4>{index + 1})   {item[0]}</h4>
        </div>
    );
      
  };


    
  return (
        <div>
            {list.map( (item, index) => GridItem(item, index))}
        </div>
      );
};

export default TopGenresList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import TopSongsTable from './TopSongsTable';
import Loader from '../Parts/Loader';

const TopSongs = () => {

  const [topSongs, setTopSongs] = useState([{}]);
  const [currentToken, setCurrentToken] = useState('');
  const [currentTerm, setCurrentTerm] = useState('short');

  useEffect(() => {
    setCurrentToken(token);
    getSongs(currentTerm);
    
  }, [currentToken, currentTerm]);

  const getSongs = async (term) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/top_songs?term=${term}`);
      setTopSongs(data.topSongs);
    }
  }

  const changeList = (e) => {
    e.preventDefault();
    setCurrentTerm(e.target.name);
  }

  var leftClassName = `btn button-in-group ${currentTerm === 'short' ? 'selected' : ''}`
  var middleClassName = `btn button-in-group ${currentTerm === 'medium' ? 'selected' : ''}`
  var rightClassName = `btn button-in-group far-right-button ${currentTerm === 'long' ? 'selected' : ''}`

  
  return (
    <div>
      <div className='header'>
        <h3>Most Played Songs</h3>
          <div className="btn-group" role="group">
              <button onClick={changeList} type="button" name='short' className={leftClassName}>Last 4 Weeks</button>
              <button onClick={changeList} type="button" name='medium' className={middleClassName}>Last 6 Months</button>
              <button onClick={changeList} type="button" name='long' className={rightClassName}>All Time</button>
          </div>
      </div>
        {topSongs.length !== 1 ? <TopSongsTable list={topSongs}/>: <Loader />}
    </div>
  );
};

export default TopSongs;

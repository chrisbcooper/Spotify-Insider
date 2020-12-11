import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import TopArtistsTable from '../Parts/TopArtistsTable';

const TopArtists = () => {

  const [topArtists, setTopArtists] = useState([{}]);
  const [currentToken, setCurrentToken] = useState('');
  const [currentTerm, setCurrentTerm] = useState('short');

  useEffect(() => {
    setCurrentToken(token);
    console.log('TOP Artists');
    console.log(topArtists);
    getArtists(currentTerm);
    
  }, [currentToken, currentTerm]);

  const getArtists = async (term) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/top_artists?term=${term}`);
      setTopArtists(data.topArtists);
    }
  }

  const changeList = (e) => {
    e.preventDefault();
    setCurrentTerm(e.target.name);
  }

  
  return (
    <div>
        <h1>Most Listened to Artists</h1>
        <div className="btn-group" role="group">
            <button onClick={changeList} type="button" name='short' className="btn btn-secondary">Last 4 Weeks</button>
            <button onClick={changeList} type="button" name='medium' className="btn btn-secondary">Last 6 Months</button>
            <button onClick={changeList} type="button" name='long' className="btn btn-secondary">All Time</button>
        </div>
        {topArtists.length !== 1 ? <TopArtistsTable list={topArtists}/>: null}
    </div>
  );
};

export default TopArtists;
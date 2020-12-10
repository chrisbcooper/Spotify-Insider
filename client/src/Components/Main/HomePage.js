import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '../Parts/Table';
import {token} from '../../Spotify';

import setAuthToken from '../../Utils/setAuthToken';

const HomePage = () => {

  const [musicHistory, setMusicHistory] = useState([{}]);
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    setCurrentToken(token);
    getMusic();
    
  }, [currentToken]);

  const getMusic = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/recently_played_songs');

      setMusicHistory(data.musicHistory);
    }

  }


  return (
    <div>
        <h1>Listening History</h1>
        {musicHistory.length !== 1 ? <Table list={musicHistory}/>: null}
    </div>
  );
};

export default HomePage;

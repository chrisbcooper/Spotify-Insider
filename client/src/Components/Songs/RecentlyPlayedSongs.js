import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RecentlyPlayedTable from './RecentlyPlayedTable';
import Loader from '../Parts/Loader';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

const RecentlyPlayedSongs = () => {

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
        <h3>Recently Played Songs</h3>
        {musicHistory.length !== 1 ? <RecentlyPlayedTable list={musicHistory}/>: <Loader />}
    </div>
  );
};

export default RecentlyPlayedSongs;

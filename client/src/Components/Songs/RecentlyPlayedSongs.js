import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RecentlyPlayedTable from '../Parts/RecentlyPlayedTable';
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
        <h1>10 Most Recently Played Songs</h1>
        {musicHistory.length !== 1 ? <RecentlyPlayedTable list={musicHistory}/>: null}
    </div>
  );
};

export default RecentlyPlayedSongs;

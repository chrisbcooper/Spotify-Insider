import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import CurrentPlaylistsTable from './CurrentPlaylistsTable';
import Loader from '../Parts/Loader';

const CurrentPlaylists = () => {

  const [currentPlaylists, setCurrentPlaylists] = useState([{}]);
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    setCurrentToken(token);
    getPlaylists();
    
  }, [currentToken]);

  const getPlaylists = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/current_playlists`);
      console.log(data);
      setCurrentPlaylists(data.current_playlists);
    }
  }
  
  return (
    <div className='center'>
        <h1>My Playlists</h1>
        {currentPlaylists.length !== 1 ? <CurrentPlaylistsTable list={currentPlaylists}/>: <Loader />}
    </div>
  );
};

export default CurrentPlaylists;
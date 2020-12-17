import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import PlaylistTable from './PlaylistTable'

const Playlist = () => {

  const [playlist, setPlaylist] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getPlaylist(id);
    
  }, [currentToken]);

  const getPlaylist = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/playlist?id=${id}`);
      console.log(data);
      setPlaylist(data.playlist);
    }
  }
  
  return (
    <div className='center'>
        {!isNull(playlist) ? <PlaylistTable playlist={playlist}/>: <Loader />}
    </div>
  );
};

export default Playlist;
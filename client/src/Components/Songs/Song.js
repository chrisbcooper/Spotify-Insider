import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import SongPage from '../Parts/SongPage';

const Song = () => {

  const [song, setSong] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getSong(id);
    
  }, [currentToken]);

  const getSong = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/song?id=${id}`);
      console.log(data.body);
      setSong(data.body);
    }
  }

  return (
    <div className='center'>
        {isNull(song) ? <Loader />: <SongPage song={song} /> }
    </div>
  );
};

export default Song;
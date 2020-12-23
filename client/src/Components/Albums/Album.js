import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import AlbumPage from './AlbumPage';

const Album = () => {

    //THERE ARE MORE SONG ENDPOINTS

  const [album, setAlbum] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getAlbum(id);
    console.log(album);
    
  }, [currentToken]);

  const getAlbum = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/album?id=${id}`);
      setAlbum(data.body);
    }
  }

  return (
    <div >
        {isNull(album) ? <Loader />: <AlbumPage album={album} /> }
    </div>
  );
};

export default Album;
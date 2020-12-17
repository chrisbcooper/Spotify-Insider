import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import ArtistPage from './ArtistPage';

const Artist = () => {

    //THERE ARE MORE ARTIST  ENDPOINTS

  const [artist, setArtist] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getArtist(id);
    
  }, [currentToken]);

  const getArtist = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/artist?id=${id}`);
      console.log(data.body);
      setArtist(data.body);
    }
  }

  return (
    <div className='center'>
        {isNull(artist) ? <Loader />: <ArtistPage artist={artist} /> }
    </div>
  );
};

export default Artist;
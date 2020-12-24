import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import SongPage from './SongPage';

const Song = () => {

  const [song, setSong] = useState();
  const [songAudioFeatures, setSongAudioFeatures] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getSong(id);
    getSongAudioFeatures(id);
    
  }, [currentToken]);

  const getSong = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/song?id=${id}`);
      console.log(data.body);
      setSong(data.body);
    }
  }

  const getSongAudioFeatures = async (id) => {
    setAuthToken(currentToken);
    var counter = 0;
    if(currentToken) {
      while(counter < 5) {
        const {data} = await axios.get(`/api/song_audio_features?id=${id}`);
        console.log(counter)
        if(isNull(data)) {
          console.log('null');
          counter++;
        } else {
          console.log(data);
          setSongAudioFeatures(data);
          break;
        }
        
      }
      
    }
  }

  return (
    <div className='center'>
        {isNull(song) || isNull(songAudioFeatures) ? <Loader />:
         <SongPage song={song} songAudioFeatures={songAudioFeatures} /> }
    </div>
  );
};

export default Song;
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
  const [songAudioAnalysis, setSongAudioAnalysis] = useState();
  const [songAudioFeatures, setSongAudioFeatures] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getSong(id);
    getSongAudioAnalysis(id);
    getSongAudioFeatures(id);
    
  }, [currentToken]);

  const getSong = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/song?id=${id}`);
      setSong(data.body);
    }
  }

  const getSongAudioAnalysis = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/song_audio_analysis?id=${id}`);
      setSongAudioAnalysis(data.body);
    }
  }

  const getSongAudioFeatures = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/song_audio_features?id=${id}`);
      setSongAudioFeatures(data.body);
    }
  }

  return (
    <div className='center'>
        {isNull(song) || isNull(songAudioAnalysis) || isNull(songAudioFeatures) ? <Loader />:
         <SongPage song={song} songAudioAnalysis={songAudioAnalysis} songAudioFeatures={songAudioFeatures} /> }
    </div>
  );
};

export default Song;
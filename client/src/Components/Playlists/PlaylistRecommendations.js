import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull, getRandomList} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import RecommendTable from './RecommendTable'

const PlaylistRecommendations = () => {

  const [playlist, setPlaylist] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const {id, name} = useParams();

  useEffect(() => {
    console.log(id);
    setCurrentToken(token);
    getPlaylistRecommendation(id);
    getCurrentUser()
  }, [currentToken]);

  const getPlaylistRecommendation = async (id) => {
    
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/playlist_recommendation?id=${id}`);
      console.log(data);
      setPlaylist(data);
    }
  }

  const getCurrentUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/current_profile');
      setCurrentUser(data.body);
    }
  } 

  return (
    <div>
        {!isNull(playlist) && !isNull(currentUser) ? <RecommendTable id={currentUser.id} playlist={playlist} name={name} profile={false}/>: <Loader />}
    </div>
  );
};

export default PlaylistRecommendations;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {token, logout} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';

const CurrentProfile = () => {

  const [userProfile, setUserProfile] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const [topGenres, setTopGenres] =useState();

  useEffect(() => {
    setCurrentToken(token);
    getUser();
    //getTopGenres();
    
  }, [currentToken]);

  const getUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/current_profile');
      setUserProfile(data.body);
    }
  }

  const getTopGenres = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/get_top_genres');
      setTopGenres(data.body);
    }
  }


  return (
      <div>
        {userProfile ? ( 
        <div className='home-user-div' >
            <h1>{userProfile.display_name}</h1>
            <img src={`${userProfile.images[0].url}`} alt="" className='profile-pic' />
            <button className='btn btn-dark logout-button' onClick={logout}>Logout</button>
            
        </div>) : 
        <Loader />}
    </div>
  );
};

export default CurrentProfile;

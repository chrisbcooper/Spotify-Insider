import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';

const Profile = () => {

  const [currentProfile, setCurrentProfile] = useState();
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    setCurrentToken(token);
    getUser();
    
  }, [currentToken]);

  const getUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/current_profile');
      setCurrentProfile(data.body);
      console.log(currentProfile);
    }
  }


  return (
      <div>
        {currentProfile ? ( 
        <div>
            <h1>{currentProfile.display_name}</h1>
            <img src={`${currentProfile.images[0].url}`} alt=""/>
            <p>Followers {currentProfile.followers.total}</p>
            
        </div>) : 
        <Loader />}
    </div>
  );
};

export default Profile;

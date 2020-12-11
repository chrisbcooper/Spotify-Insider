import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';

const CurrentProfile = () => {

  const [userProfile, setUserProfile] = useState();
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    setCurrentToken(token);
    getUser();
    
  }, [currentToken]);

  const getUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/current_profile');
      setUserProfile(data.body);
    }
  }


  return (
      <div>
        {userProfile ? ( 
        <div>
            <h1>{userProfile.display_name}</h1>
            <img src={`${userProfile.images[0].url}`} alt="" className='profile-pic' />
            <p>Followers {userProfile.followers.total}</p>
            
        </div>) : 
        <Loader />}
    </div>
  );
};

export default CurrentProfile;

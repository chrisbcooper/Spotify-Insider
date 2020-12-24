import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import ProfilePage from './ProfilePage';

const Profile = () => {

  const [profile, setProfile] = useState();
  const [profilePlaylists, setProfilePlaylists] = useState();
  const [following, setFollowing] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getProfile(id);
    getProfilePlaylists(id);
    getFollowing(id);
    getCurrentUser();

  }, [currentToken]);

  const getProfile = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/profile?id=${id}`);
      setProfile(data.body);
    }
  }

  const getProfilePlaylists = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/profile_playlists?id=${id}`);
      setProfilePlaylists(data.body);
    }
  }

  const getFollowing = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/follow?id=${id}&type=user`);
      setFollowing(data[0]);
    }
  }

  const getCurrentUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/current_profile`);
      setCurrentUser(data.body);
    }
  }


  

  return (
    <div>
        {isNull(profile) || isNull(profilePlaylists) || isNull(following) || isNull(currentUser) ? <Loader />:
        <ProfilePage following={following} currentUser={currentUser} profile={profile} playlists={profilePlaylists}/> }
    </div>
  );
};

export default Profile;
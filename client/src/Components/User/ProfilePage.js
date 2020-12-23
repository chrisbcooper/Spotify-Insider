import React, { useEffect, useState } from 'react';
import {Checkmark} from 'react-checkmark';
import axios from 'axios';

import {isNull} from '../../Utils';
import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import ProfilePlaylistTable from './ProfilePlaylistTable';

const ProfilePage = ({profile, playlists, following}) => {

  const [newFollow, setNewFollow] = useState(following);
  const [currentToken, setCurrentToken] = useState('');

  useEffect(() => {
    if(isNull(profile) || isNull(playlists)) {
        return '';
    }
    setCurrentToken(token);
  },[]);

  const clickFollow = async () => {
    setAuthToken(currentToken);

    if(currentToken) {
      const {data} = await axios.put(`/follow?id=${profile.id}&type=user`);
      console.log(data);
      if(data === 'success') {
        setNewFollow(true);
      }
    }
  }
    
  return (
    <div>
        <h1>{profile.display_name}</h1>
        <img src={`${profile.images[0].url}`} alt="" className='profile-pic' style={{marginBottom: '30px', marginTop: '15px'}}/>
        <h4 style={{marginBottom: '30px'}}>Playlists</h4>
        { newFollow ? <div className='user-follow'><div className='playlist-created'><Checkmark size={20} /> <p style={{marginLeft: '10px'}}>Following</p></div></div> :
          <button onClick={clickFollow} className='btn login-btn' >Follow</button>
        }
        <ProfilePlaylistTable list={playlists.items} />
    </div>
      );
};

export default ProfilePage;

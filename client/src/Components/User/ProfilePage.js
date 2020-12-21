import React, { useEffect } from 'react';

import {isNull} from '../../Utils';
import {logout} from '../../Spotify';

import ProfilePlaylistTable from './ProfilePlaylistTable';

const ProfilePage = ({profile, playlists}) => {

  useEffect(() => {
    if(isNull(profile) || isNull(playlists)) {
        return '';
    }
  },[]);

    
  return (
    <div>
        <h1>{profile.display_name}</h1>
        <img src={`${profile.images[0].url}`} alt="" className='profile-pic' style={{marginBottom: '30px', marginTop: '15px'}}/>
        <h4 style={{marginBottom: '30px'}}>Playlists</h4>
        <ProfilePlaylistTable list={playlists.items} />
    </div>
      );
};

export default ProfilePage;

import React, { useEffect } from 'react';

import {isNull} from '../../Utils';

import CurrentPlaylistsTable from '../Playlists/CurrentPlaylistsTable';

const ProfilePage = ({profile, playlists}) => {

  useEffect(() => {
    if(isNull(profile) || isNull(playlists)) {
        return '';
    }
  },[]);

    
  return (
    <div>
        <h1>{profile.display_name}</h1>
        <img src={`${profile.images[0].url}`} alt="" className='profile-pic'/>
        <CurrentPlaylistsTable list={playlists.items} />
    </div>
      );
};

export default ProfilePage;

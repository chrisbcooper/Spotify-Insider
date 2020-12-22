import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import PlaylistTable from './PlaylistTable'

const Playlist = () => {

  const [playlist, setPlaylist] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getPlaylist(id);
    
  }, [currentToken]);

  const getPlaylist = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/playlist?id=${id}`);
      console.log(data);
      setPlaylist(data.playlist);
    }
  }
  
  return (
    <div>
        {!isNull(playlist) ? <div>
          <h2>{playlist.name}</h2>
            <img src={`${playlist.images[0].url}`} className='playlist-page-pic' style={{marginBottom: '20px'}}  alt=""/>
            <a href={`/profile/${playlist.owner.id}`}><p>By: {playlist.owner.display_name}</p></a>
            <p>{playlist.description}</p>
            <p>{playlist.tracks.total} Tracks</p>
            <a className="btn login-btn" href={`/playlist_recommendations/${playlist.id}/${playlist.name}`}>Get Recommended Playlist</a>
        <PlaylistTable playlist={playlist}/>
        </div> :
         <Loader />}
    </div>
  );
};

export default Playlist;
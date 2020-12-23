import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Checkmark} from 'react-checkmark';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import PlaylistTable from './PlaylistTable'

const Playlist = () => {

  const [playlist, setPlaylist] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const [follow, setFollow] = useState();
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getPlaylist(id);
    getFollow();

  }, [currentToken]);

  const getPlaylist = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/playlist?id=${id}`);
      console.log(data);
      setPlaylist(data.playlist);
    }
  }

  const getFollow = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      var response = await axios.get('/current_profile');
      var user = response.data.body.id;
      const {data} = await axios.get(`/follow_playlist?id=${id}&user=${user}`);
      setFollow(data[0]);
      
    }
  }
  
  const clickFollow = async () => {
    setAuthToken(currentToken);

    if(currentToken) {
      const {data} = await axios.put(`/follow_playlist?id=${id}`);
      console.log(data);
      if(data === 'success') {
        setFollow(true);
      }
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
            { follow ? <div className='user-follow'><div className='playlist-created'><Checkmark size={20} /> <p style={{marginLeft: '10px'}}>Following</p></div></div> :
          <button onClick={clickFollow} className='btn login-btn' >Follow</button>
        }
        <PlaylistTable playlist={playlist}/>
        </div> :
         <Loader />}
    </div>
  );
};

export default Playlist;
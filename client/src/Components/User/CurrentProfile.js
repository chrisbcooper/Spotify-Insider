import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';

import {token, logout} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import { isNull } from '../../Utils';

import TopGenresList from './TopGenresList';
import RecommendTable from '../Playlists/RecommendTable';

const CurrentProfile = () => {

  const [userProfile, setUserProfile] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const [recommendedPlaylist, setRecommendedPlaylist] = useState();
  const [topGenres, setTopGenres] = useState();
  const [currentTerm, setCurrentTerm] = useState('short');

  useEffect(() => {
    setCurrentToken(token);
    getUser();
    getTopGenres(currentTerm);
    getRecommendedPlaylist();
  
  }, [currentToken, currentTerm]);

  const getUser = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get('/api/current_profile/');
      setUserProfile(data.body);
    }
  }

  const getTopGenres = async (term) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/api/top_genres?term=${term}`);
      setTopGenres(data);
    }
  }

  const getRecommendedPlaylist = async () => {
    setAuthToken(currentToken);
    
    if(currentToken) {
      const {data} = await axios.get('/api/general_recommendation/');
      setRecommendedPlaylist(data);
    }
  }

  const changeList = (e) => {
    e.preventDefault();
    setCurrentTerm(e.target.name);
  }

  var leftClassName = `btn button-in-group ${currentTerm === 'short' ? 'selected' : ''}`;
  var middleClassName = `btn button-in-group ${currentTerm === 'medium' ? 'selected' : ''}`;
  var rightClassName = `btn button-in-group far-right-button ${currentTerm === 'long' ? 'selected' : ''}`;

  return (
      <div>
        {!isNull(userProfile) && !isNull(topGenres) && !isNull(recommendedPlaylist) ? ( 
        <div className='home-user-div' >
            <h1 style={{marginBottom: '0'}}>{userProfile.display_name}</h1>
            {userProfile.images.length === 0 ? <FontAwesomeIcon className='profile-pic' size='5x' icon={faUser}/>
            : <img src={`${userProfile.images[0].url}`} alt="" className='profile-pic' />
            }
            <button className='btn  home-logout-button' onClick={logout}>Logout</button>
            <div style={{margin: '0 10%'}}>
            <div className='header'>
              <h3>Top Genres</h3>
                <div className="btn-group" role="group">
                    <button onClick={changeList} type="button" name='short' className={leftClassName}>Last 4 Weeks</button>
                    <button onClick={changeList} type="button" name='medium' className={middleClassName}>Last 6 Months</button>
                    <button onClick={changeList} type="button" name='long' className={rightClassName}>All Time</button>
                </div>
            </div>
              <TopGenresList list={topGenres} />
              <RecommendTable playlist={recommendedPlaylist} id={userProfile.id} profile={true} />
          </div>
        </div>) : 
        <Loader />}
    </div>
  );
};

export default CurrentProfile;

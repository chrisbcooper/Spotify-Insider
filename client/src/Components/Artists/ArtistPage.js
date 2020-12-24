import React, { useEffect, useState } from 'react';
import {Checkmark} from 'react-checkmark';
import axios from 'axios';

import {isNull, stars} from '../../Utils';
import {token} from '../../Spotify';
import setAuthToken from '../../Utils/setAuthToken';

import ArtistTopTracks from './ArtistTopTracks';
import ArtistAlbums from './ArtistAlbums';


const ArtistPage = ({artist, relatedArtists, topTracks, albums, following}) => {

  const [numberOfTracks, setNumberOfTracks] = useState(false);
  const [numberOfAlbums, setNumberOfAlbums] = useState(false);
  const [songButton, setSongButton] = useState(true);
  const [albumButton, setAlbumButton] = useState(true);
  const [newFollow, setNewFollow ] = useState(following);
  const [currentToken, setCurrentToken] = useState('');


  useEffect(() => {
    if(isNull(artist)) {
        return '';
    }
    setCurrentToken(token);
  
    checkButtons();
  },[]);

  const artistStars = stars(artist.popularity);

  const onClickSong = (e) => {
    e.preventDefault();
    setNumberOfTracks(!numberOfTracks);
  }

  const onClickAlbum = (e) => {
    e.preventDefault();
    setNumberOfAlbums(!numberOfAlbums);
  }
    
  const checkButtons = () => {
    if(topTracks.tracks.length < 6) {
      setSongButton(false);
    }

    if(albums.items.length < 9) {
      setAlbumButton(false);
    }
  }

  const Followers = ({num}) => {

    var numString = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    return (
      numString
    );
  }

  const clickFollow = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.put(`/api/follow?id=${artist.id}&type=artist`);
      if(data === 'success') {
        setNewFollow(true);
      }
    }
  }

  const clickunFollow = async () => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.delete(`/api/unfollow?id=${artist.id}&type=artist`);
      if(data === 'success') {
        setNewFollow(false);
      }
    }
  }

  return (
    <div className='artist-outer-div'>
        <h1 className='artist-name' >{artist.name}</h1>
        <img src={`${artist.images[0].url}`} alt="" className='profile-pic artist-pic'/>
        <div className='artist-details'>
          <div>
            <p className='artist-stars' >{artistStars}</p>
            <p className="artist-label">Popularity</p>
          </div>
          <div style={{display: 'inline-block'}}>
          {artist.genres.length == 0 ? <p>N/A</p> : 
            <ul>
              {artist.genres.map((item, index) => (
                <li key={index}>
                  <p style={{lineHeight: '1rem'}}>{item}</p>
                </li>
              ))}
            </ul>
          }
          <p className="artist-label">Genres</p>
          </div>
          <div>
            <p><Followers num={artist.followers.total} /></p>
            <p className='artist-label'>Followers</p>
          </div>
        </div>
        { newFollow ? <div onClick={clickunFollow} className='playlist-created'><Checkmark size={20} /> <p style={{marginLeft: '10px'}}>Following</p></div> :
          <button onClick={clickFollow} className='btn login-btn' >Follow</button>
        }
        <h3>Top Tracks</h3>
        <ArtistTopTracks list={topTracks.tracks} all={numberOfTracks} />
        { songButton ? 
          <button onClick={onClickSong} className='btn btn-dark logout-button' >Show {numberOfTracks ? 'less' : 'more'}</button> :
          <div style={{margin: '5px'}}></div>
        }
        
        <h3 className='album-name-header'>Albums</h3>
        <div style={{width: '100%'}}><ArtistAlbums albums={albums.items} all={numberOfAlbums} /></div>
        { albumButton && 
          <button onClick={onClickAlbum} className='btn btn-dark logout-button' >Show {numberOfAlbums ? 'less' : 'all'}</button> 
        }
    </div>
      );
};

export default ArtistPage;

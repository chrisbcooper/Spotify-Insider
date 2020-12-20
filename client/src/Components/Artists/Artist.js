import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import {token} from '../../Spotify';
import {isNull} from '../../Utils';
import setAuthToken from '../../Utils/setAuthToken';

import Loader from '../Parts/Loader';
import ArtistPage from './ArtistPage';

const Artist = () => {

    //THERE ARE MORE ARTIST  ENDPOINTS

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [relatedArtists, setRelatedArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [currentToken, setCurrentToken] = useState('');
  const {id} = useParams();

  useEffect(() => {
    setCurrentToken(token);
    getArtist(id);
    getAlbums(id);
    getRelatedArtists(id);
    getTopTracks(id);
    
  }, [currentToken]);

  const getArtist = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/artist?id=${id}`);
      setArtist(data.body);
    }
  }

  const getAlbums = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/artist_albums?id=${id}`);
      setAlbums(data.body);
    }
  }

  const getRelatedArtists = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/artist_related_artists?id=${id}`);
      setRelatedArtists(data.body);
    }
  }

  const getTopTracks = async (id) => {
    setAuthToken(currentToken);
    if(currentToken) {
      const {data} = await axios.get(`/artist_top_tracks?id=${id}`);
      setTopTracks(data.body);
    }
  }


  return (
    <div>
        {isNull(artist) || isNull(albums) || isNull(relatedArtists) || isNull(topTracks) ? <Loader /> 
        : <ArtistPage albums={albums} artist={artist}  topTracks={topTracks} relatedArtists={relatedArtists}/> }
    </div>
  );
};

export default Artist;
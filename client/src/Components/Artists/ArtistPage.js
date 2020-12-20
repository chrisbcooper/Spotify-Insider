import React, { useEffect, useState } from 'react';

import {isNull, stars} from '../../Utils';

import ArtistTopTracks from './ArtistTopTracks';
import ArtistAlbums from './ArtistAlbums';

const ArtistPage = ({artist, relatedArtists, topTracks, albums}) => {

  const [numberOfTracks, setNumberOfTracks] = useState(false);
  const [numberOfAlbums, setNumberOfAlbums] = useState(false);

  useEffect(() => {
    if(isNull(artist)) {
        return '';
    }
    console.log(artist);
    console.log(albums.items);
    console.log(relatedArtists);
    console.log(topTracks);
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
    

  const Followers = ({num}) => {

    var numString = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    return (
      numString
    );
  }


  return (
    <div className='artist-outer-div'>
        <h1 className='artist-name' >{artist.name}</h1>
        <img src={`${artist.images[0].url}`} alt="" className='profile-pic artist-pic'/>
        <div className='artist-details'>
          <div>
            <p className='artist-stars' >{artistStars}</p>
            <p className="artist-lable">Popularity</p>
          </div>
          {artist.genres.length === 0 ? '' : 
          <div style={{display: 'inline-block'}}>
            <ul>
              {artist.genres.map((item, index) => (
                <li key={index}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <p className="artist-lable">Genres</p>
          </div>
          }
          <div>
            <p><Followers num={artist.followers.total} /></p>
            <p className='artist-lable'>Followers</p>
          </div>
        </div>
        <h3>Top Tracks</h3>
        <ArtistTopTracks list={topTracks.tracks} all={numberOfTracks} />
        {<button onClick={onClickSong} className='btn btn-dark logout-button' >Show {numberOfTracks ? 'less' : 'more'}</button> }
        <h3 className='album-name-header'>Albums</h3>
        <ArtistAlbums albums={albums.items} all={numberOfAlbums} />
        {<button onClick={onClickAlbum} className='btn btn-dark logout-button' >Show {numberOfAlbums ? 'less' : 'all'}</button> }
    </div>
      );
};

export default ArtistPage;

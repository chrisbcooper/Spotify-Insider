import React, { useEffect } from 'react';

import {isNull, pitchNumber, milliToSeconds} from '../../Utils';

import SongFeaturesChart from './SongFeaturesChart';

const SongPage = ({song, songAudioFeatures, songAudioAnalysis}) => {

  useEffect(() => {
    if(isNull(song)) {
        return '';
    }
    console.log(song);
    console.log(songAudioAnalysis);
    console.log(songAudioFeatures);
  },[]);

    
  return (
    <div className='song-page-outer-div' >
        <h2>{song.name}</h2>
        <img src={`${song.album.images[0].url}`} alt="" class='playlist-page-pic'/>
        <a className='song-page-name' href={`/artist/${song.artists[0].id}`}><p>By: {song.artists[0].name}</p></a>
        <p>Relased: {song.album.release_date}</p>
        <p>{pitchNumber(songAudioFeatures.key)}</p>
        <p>{songAudioFeatures.mode === 0 ? 'Major' : 'Minor'}</p>
        <p>Tempo: {Math.floor(songAudioFeatures.tempo)} BPM</p>
        <p>{milliToSeconds(songAudioFeatures.duration_ms)}</p>
        <SongFeaturesChart song={song} songAudioFeatures={songAudioFeatures} songAudioAnalysis={songAudioAnalysis}  />
    </div>
      );
};

export default SongPage;

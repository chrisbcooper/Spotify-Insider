import React, { useEffect } from 'react';

import {isNull, pitchNumber, milliToSeconds} from '../../Utils';

import SongFeaturesChart from './SongFeaturesChart';

const SongPage = ({song, songAudioFeatures, dataAvailable}) => {

  useEffect(() => {
    if(isNull(song)) {
        return '';
    }
  },[]);

  const date = () => {
    var str_date = song.album.release_date;
    const arr_date = str_date.split('-');
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateNum = parseInt(arr_date[2]) >= 10 ? arr_date[2] : `${String(arr_date[2]).charAt(1)}` 

    return (months[parseInt(arr_date[1])] + ' ' + dateNum + ', ' + arr_date[0]);
  }

    
  return (
    <div className='song-page-outer-div' >
        <img src={`${song.album.images[0].url}`} alt="" class='playlist-page-pic'/>
        <h2 className='song-name'  >{song.name}</h2>
        <a className='song-page-name' href={`/artist/${song.artists[0].id}`}><p>By: {song.artists[0].name}</p></a>
        { !dataAvailable? <p>Song Data not available right now.</p>
          :<div>
          <div className='row song-details justify-content-center'>
          <div className='col col-md-auto col-sm-4 col-4' >
            <p>{date()}</p>
            <p className='artist-label' >Released</p>
          </div>
          <div className='col col-md-auto col-sm-4 col-4'>
            <p>{milliToSeconds(songAudioFeatures.duration_ms)}</p>
            <p className='artist-label' >Duration</p>
          </div>
          <div className='col col-md-auto col-sm-4 col-4'>
              <p>{pitchNumber(songAudioFeatures.key)}</p>
              <p className='artist-label' >Key</p>
            </div>
            <div className='col col-md-auto col-sm-4 col-4'>
              <p>{songAudioFeatures.mode === 0 ? 'Major' : 'Minor'}</p>
              <p className="artist-label">Mode</p>
            </div>
            <div className='col col-md-auto col-sm-4 col-4'>
              <p>{Math.floor(songAudioFeatures.tempo)} (BPM)</p>
              <p className="artist-label">Tempo</p>
            </div>
        </div>
          <div className="song-details-2">
            
          </div>   
        <SongFeaturesChart songAudioFeatures={songAudioFeatures} />
        </div>
        }
    </div>
      );
};

export default SongPage;

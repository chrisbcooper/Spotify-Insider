import React, { useEffect, useState } from 'react';

import {isNull, pitchNumber, milliToSeconds} from '../../Utils';

import {Bar} from 'react-chartjs-2';

const SongFeaturesChart = ({song, songAudioFeatures, songAudioAnalysis}) => {


  useEffect(() => {
  }, [])


  const data = {
    labels: ['Danceability', 'Energy', 'Acousticness', 'Instrumentalness', 'Liveness'],
    datasets: [
      {
        label: '',
        data: [
          songAudioFeatures.danceability,
          songAudioFeatures.energy,
          songAudioFeatures.acousticness,
          songAudioFeatures.Instrumentalness,
          songAudioFeatures.liveness
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6',
          'rgba(54, 162, 235, 0.6',
          'rgba(255, 206, 86, 0.6',
          'rgba(74, 192, 192, 0.6',
          'rgba(153, 102, 255, 0.6',
        ]
      }

    ]
  }

  return (
    <div style={{width: '100%', maxWidth: '700px'}}>
      <Bar 
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          display: true,
          text: 'Song data'
        },
        legend: {
          display: false
        },
      }}
    />
    </div>
  );


};

export default SongFeaturesChart;

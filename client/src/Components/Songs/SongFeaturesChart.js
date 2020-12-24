import React, { useEffect, useState } from 'react';

import {Bar} from 'react-chartjs-2';

const SongFeaturesChart = ({songAudioFeatures}) => {


  useEffect(() => {
  }, [])


  const data = {
    labels: ['Danceability', 'Energy', 'Acousticness', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'],
    datasets: [
      {
        label: '',
        data: [
          songAudioFeatures.danceability,
          songAudioFeatures.energy,
          songAudioFeatures.acousticness,
          songAudioFeatures.instrumentalness,
          songAudioFeatures.liveness, 
          songAudioFeatures.speechiness,
          songAudioFeatures.valence
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(74, 192, 192, 0.3)',
          'rgba(255, 165, 0, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(34, 139, 34, 0.3)'
        ], 
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(74, 192, 192, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(34, 139, 34, 1)'
        ], 
        borderWidth: 1,
      }
    ]
  }

  return (
    <div style={{width: '100%', maxWidth: '600px'}}>
      <Bar 
      data={data}
      width={300}
      height={250}
      options={{
        legend: {
          display: false
        },
      }}
    />
    </div>
  );


};

export default SongFeaturesChart;

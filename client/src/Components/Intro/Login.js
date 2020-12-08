import React, { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';


import Table from '../Parts/Table';

const Login = () => {

  const [isUserAuthorized, setUserAuthorized] = useState(false);
  const [musicHistory, setMusicHistory] = useState([{}]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('authorized')) {
      getMusic();
    }
  }, [isUserAuthorized]);

  const getMusic = async () => {
    fetch('http://localhost:5000/history')
    .then(res => 
        res.json())
    .then(data => {
      console.log(data);
      setMusicHistory(data);
    })
    .catch(err => console.log(err));
  }


  const connectSpotify = isUserAuthorized ? (' ') : (<a href="http://localhost:5000/login">Connect your Spotify account</a>);

  return (
    <div>
        <h1>Spotify Listening History</h1>
        <p>View your music history in realtime with Spotify and Pusher</p>

        {connectSpotify}
        {musicHistory.length !== 0 ? <Table list={musicHistory}/>: null}
    </div>
  );
};

export default Login;

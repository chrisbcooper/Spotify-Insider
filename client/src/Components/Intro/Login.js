import React from 'react';


var link = process.env.NODE_ENV != 'production' ? "http://localhost:5000/login" : '';
const Login = () => {


  return (
    <div>
        <h1>Login to Spotify</h1>
        <a href={`${link}`}>Connect your Spotify account</a>
    </div>
  );
};

export default Login;

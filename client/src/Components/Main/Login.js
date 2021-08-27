import React, { useEffect } from 'react';

var link =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api/login/'
		: 'http://spotify-insider.herokuapp.com/api/login';
const Login = () => {
	useEffect(() => {}, []);

	return (
		<div className='login-div'>
			<h1>Spotify Insider</h1>
			<h4>Learn more about your spotify account!</h4>
			<a className='btn login-btn' href={`${link}`}>
				Login to Spotify
			</a>
		</div>
	);
};

export default Login;

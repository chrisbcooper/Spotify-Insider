const spotify = require('../../Setters/credentials');

const authorizeSpotify = (req, res) => {
	const scope1 = 'user-read-recently-played user-top-read';
	const scope2 =
		'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
	const scope3 =
		'user-follow-modify user-follow-read  user-read-email user-read-private';

	const url = `https://accounts.spotify.com/authorize?&client_id=${
		spotify.client_id
	}&redirect_uri=${encodeURI(
		spotify.redirect_uri
	)}&response_type=code&scope=${scope1} ${scope2} ${scope3}`;

	res.redirect(url);
};

module.exports = authorizeSpotify;

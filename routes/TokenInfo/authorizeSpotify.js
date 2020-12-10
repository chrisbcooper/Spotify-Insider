const spotify = require('../../Setters/credentials');


const authorizeSpotify = (req, res) => {
    const scope = 'user-read-recently-played';

    const url = `https://accounts.spotify.com/authorize?&client_id=${
        spotify.client_id
    }&redirect_uri=${encodeURI(
        spotify.redirect_uri
        )}&response_type=code&scope=${scope}`;

    res.redirect(url);
}


module.exports = authorizeSpotify;
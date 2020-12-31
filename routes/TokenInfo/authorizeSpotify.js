const spotify = require('../../Setters/credentials');


const authorizeSpotify = (req, res) => {
    const scope1 = 'ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing';
    const scope2 = 'app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative'
    const scope3 = 'user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private';

    const url = `https://accounts.spotify.com/authorize?&client_id=${
        spotify.client_id
    }&redirect_uri=${encodeURI(
        spotify.redirect_uri
        )}&response_type=code&scope=${scope1} ${scope2} ${scope3}/`;

    res.redirect(url);
}


module.exports = authorizeSpotify;
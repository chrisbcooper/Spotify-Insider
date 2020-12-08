const express = require('express');
const router = express.Router();
const fecth = require('node-fetch');
const queryString = require('querystring');
const spotify = require('../Setters/credentials');



// router.get('login', async (req, res) => {
//     let scope = 'user-modeify-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-library-read playlist-read-private playlist-modify-public';
//     res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECTURI}&score=${scope}&show_dialogue=true`)
// });

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
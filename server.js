const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.unsubscribe(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true}));

//TOKEN INFO
const authorizeSpotify = require('./routes/TokenInfo/authorizeSpotify.js');
const getAccessToken = require('./routes/TokenInfo/getAccessToken.js');
const refreshToken = require('./routes/TokenInfo/refreshToken.js');

//SPOTIFY INFO
const getRecentlyPlayedSongs = require('./routes/GetInfo/getRecentlyPlayedSongs.js');
const getCurrentUserProfile = require('./routes/GetInfo/getCurrentUserProfile.js');
const getTopSongs = require('./routes/GetInfo/getTopSongs.js');
const getTopArtists = require('./routes/GetInfo/getTopArtists.js');
const getCurrentPlaylists = require('./routes/GetInfo/getCurrentPlaylists.js');
const getPlaylist = require('./routes/GetInfo/getPlaylist.js');

//TOKEN ROUTES
app.get('/api/login', authorizeSpotify);
app.get('/api/callback', getAccessToken);
app.get('/api/refresh_token', refreshToken);

//SPOTIFY ROUTES
app.get('/api/recently_played_songs', getRecentlyPlayedSongs);
app.get('/api/current_profile', getCurrentUserProfile);
app.get('/api/top_songs', getTopSongs);
app.get('/api/top_artists', getTopArtists);
app.get('/api/current_playlists', getCurrentPlaylists);
app.get('/api/playlist', getPlaylist);




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

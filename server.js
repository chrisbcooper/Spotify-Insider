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

//TOKEN ROUTEs
app.get('/login', authorizeSpotify);
app.get('/callback', getAccessToken);
app.get('/refresh_token', refreshToken);

//SPOTIFY ROUTES
app.get('/recently_played_songs', getRecentlyPlayedSongs);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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
const getRecentlyPlayedSongs = require('./routes/GetInfo/Songs/getRecentlyPlayedSongs.js');
const getCurrentUserProfile = require('./routes/GetInfo/Profiles/getCurrentUserProfile.js');
const getTopSongs = require('./routes/GetInfo/Songs/getTopSongs.js');
const getTopArtists = require('./routes/GetInfo/Artists/getTopArtists.js');
const getCurrentPlaylists = require('./routes/GetInfo/Playlists/getCurrentPlaylists.js');
const getPlaylist = require('./routes/GetInfo/Playlists/getPlaylist.js');
const getProfile = require('./routes/GetInfo/Profiles/getProfile.js');
const getProfilePlaylists = require('./routes/GetInfo/Playlists/getProfilePlaylists.js');
const getSong = require('./routes/GetInfo/Songs/getSong.js');
const getArtist = require('./routes/GetInfo/Artists/getArtist');
const getAlbum = require('./routes/GetInfo/Albums/getAlbum.js');
const getArtistsAlbums = require('./routes/GetInfo/Albums/getArtistsAlbums.js');
const getArtistsTopTracks = require('./routes/GetInfo/Songs/getArtistsTopTracks.js');
const getRelatedArtists = require('./routes/GetInfo/Artists/getRelatedArtists.js');
const getSongAudioAnalysis = require('./routes/GetInfo/Songs/getSongAudioAnalysis.js');
const getSongAudioFeatures = require('./routes/GetInfo/Songs/getSongAudioFeatures.js');
const getTopGenres = require('./routes/GetInfo/Profiles/getTopGenres.js');

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
app.get('/api/profile', getProfile);
app.get('/api/profile_playlists', getProfilePlaylists);
app.get('/api/song', getSong);
app.get('/api/artist', getArtist);
app.get('/api/album', getAlbum);
app.get('/api/artist_albums', getArtistsAlbums);
app.get('/api/artist_related_artists', getRelatedArtists);
app.get('/api/artist_top_tracks', getArtistsTopTracks);
app.get('/api/song_audio_analysis', getSongAudioAnalysis);
app.get('/api/song_audio_features', getSongAudioFeatures);
app.get('/get_top_genres', getTopGenres);





app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

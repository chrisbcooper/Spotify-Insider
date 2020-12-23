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

///////////SPOTIFY INFO///////////////

//ALBUM ENDPOINTS
const getAlbum = require('./routes/GetInfo/Albums/getAlbum.js');
const getArtistsAlbums = require('./routes/GetInfo/Albums/getArtistsAlbums.js');

//ARTIST ENDPOINTS
const getTopArtists = require('./routes/GetInfo/Artists/getTopArtists.js');
const getArtist = require('./routes/GetInfo/Artists/getArtist');
const getRelatedArtists = require('./routes/GetInfo/Artists/getRelatedArtists.js');
const getArtistsTopTracks = require('./routes/GetInfo/Artists/getArtistsTopTracks.js');
const putFollow = require('./routes/GetInfo/Artists/putFollow.js');
const getFollow = require('./routes/GetInfo/Artists/getFollow.js');
const deleteUnfollow = require('./routes/GetInfo/Artists/deleteUnfollow.js');

//PROFILE ENDPOINTS
const getCurrentUserProfile = require('./routes/GetInfo/Profiles/getCurrentUserProfile.js');
const getProfile = require('./routes/GetInfo/Profiles/getProfile.js');
const getTopGenres = require('./routes/GetInfo/Profiles/getTopGenres.js');

//PLAYLIST ENDPOINTS
const getCurrentPlaylists = require('./routes/GetInfo/Playlists/getCurrentPlaylists.js');
const getPlaylist = require('./routes/GetInfo/Playlists/getPlaylist.js');
const getPlaylistRecommendation = require('./routes/GetInfo/Playlists/getPlaylistRecommendation.js');
const postCreatePlaylist = require('./routes/GetInfo/Playlists/postCreatePlaylist.js');
const postAddToPlaylist = require('./routes/GetInfo/Playlists/postAddToPlaylist.js');
const getGeneralRecommendedPlaylist = require('./routes/GetInfo/Playlists/getGeneralRecommendedPlaylist.js');
const putFollowPlaylist = require('./routes/GetInfo/Playlists/putFollowPlaylist.js');
const getFollowPlaylist = require('./routes/GetInfo/Playlists/getFollowPlaylist.js');
const deleteUnfollowPlaylist = require('./routes/GetInfo/Playlists/deleteUnfollowPlaylist.js');
const getProfilePlaylists = require('./routes/GetInfo/Playlists/getProfilePlaylists.js');

//SONG ENDPOINTS
const getRecentlyPlayedSongs = require('./routes/GetInfo/Songs/getRecentlyPlayedSongs.js');
const getTopSongs = require('./routes/GetInfo/Songs/getTopSongs.js');
const getSong = require('./routes/GetInfo/Songs/getSong.js');
const getSongAudioAnalysis = require('./routes/GetInfo/Songs/getSongAudioAnalysis.js');
const getSongAudioFeatures = require('./routes/GetInfo/Songs/getSongAudioFeatures.js');





//TOKEN ROUTES
app.get('/api/login', authorizeSpotify);
app.get('/api/callback', getAccessToken);
app.get('/api/refresh_token', refreshToken);

/////////SPOTIFY ROUTES////////////

//ALBUM ROUTES
app.get('/api/album', getAlbum);
app.get('/api/artist_albums', getArtistsAlbums);

//ARTIST ROUTES
app.get('/api/top_artists', getTopArtists);
app.get('/api/artist', getArtist);
app.get('/api/artist_related_artists', getRelatedArtists);
app.get('/api/artist_top_tracks', getArtistsTopTracks);
app.put('/api/follow', putFollow);
app.get('/api/follow', getFollow);
app.delete('/api/unfollow', deleteUnfollow);

//PROFILE ROUTES
app.get('/api/current_profile', getCurrentUserProfile);
app.get('/api/profile', getProfile);
app.get('/api/top_genres', getTopGenres);

//PLAYLIST ROUTES
app.get('/api/current_playlists', getCurrentPlaylists);
app.get('/api/playlist', getPlaylist);
app.get('/api/profile_playlists', getProfilePlaylists);
app.get('/api/playlist_recommendation', getPlaylistRecommendation);
app.post('/api/create_playlist', postCreatePlaylist);
app.post('/api/add_to_playlist', postAddToPlaylist);
app.get('/api/general_recommendation', getGeneralRecommendedPlaylist);
app.put('/api/follow_playlist', putFollowPlaylist);
app.get('/api/follow_playlist', getFollowPlaylist);
app.delete('/api/unfollow_playlist', deleteUnfollowPlaylist);


//SONG ROUTES
app.get('/api/recently_played_songs', getRecentlyPlayedSongs);
app.get('/api/top_songs', getTopSongs);
app.get('/api/song', getSong);
app.get('/api/song_audio_analysis', getSongAudioAnalysis);
app.get('/api/song_audio_features', getSongAudioFeatures);





app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


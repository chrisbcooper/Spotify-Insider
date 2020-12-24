const request = require('request');

const getPlaylistRecommendation = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/playlists/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, async function (error, response, body) {
      
      var playlist;
      if (!error && response.statusCode === 200) { 
        playlist = body;
      }

      if(playlist) {

        var songs = playlist.tracks.items;
        songs = songs.sort(() => Math.random() - 0.5);

        var lessSongs = songs.slice(0,5);
        var songIDs = lessSongs.map((item) => item.track.id).join(',');

        const artists ='';
        const genres = '';

        const newAuthOptions = {
          url: `https://api.spotify.com/v1/recommendations?seed_tracks=${songIDs}&seed_artists=${artists}&seed_genres=${genres}`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          json: true
        };

        await request.get(newAuthOptions, function (err, resp, b) {
          res.send(b);
      });
    }
  });

    


};

module.exports = getPlaylistRecommendation;

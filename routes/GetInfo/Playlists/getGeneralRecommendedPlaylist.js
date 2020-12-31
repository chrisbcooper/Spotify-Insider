const request = require('request');

const getGeneralRecommendedPlaylist = async (req, res) => {
    const token = req.header('x-auth-token');
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/top/tracks?&time_range=short_term`,
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

        var songs = playlist.items;
        songs = songs.sort(() => Math.random() - 0.5);

        var lessSongs = songs.slice(0,5);
        var songIDs = lessSongs.map((item) => item.id).join(',');

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

module.exports = getGeneralRecommendedPlaylist;

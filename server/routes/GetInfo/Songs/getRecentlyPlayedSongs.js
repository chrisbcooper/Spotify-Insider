const request = require('request');

const getRecentlyPlayedSongs = async (req, res) => {
    const token = req.header('x-auth-token');
    
    const authOptions = {
        url: 'https://api.spotify.com/v1/me/player/recently-played',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      const musicHistory = body.items;
      res.send({ musicHistory });
    });


};

module.exports = getRecentlyPlayedSongs;

const request = require('request');

const getCurrentPlaylists = async (req, res) => {
    const token = req.header('x-auth-token');

    const authOptions = {
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const current_playlists = body.items;
        res.send({ current_playlists });
      }
    });

};

module.exports = getCurrentPlaylists;

const request = require('request');

const postAddToPlaylist = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    const uris = req.query.uris;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${uris}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.post(authOptions, function (error, response, body) {
        res.send(body)
    });

};

module.exports = postAddToPlaylist;

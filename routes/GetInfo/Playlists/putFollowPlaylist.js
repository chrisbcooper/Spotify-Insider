const request = require('request');

const putFollowPlaylist = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/playlists/${id}/followers`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.put(authOptions, function (error, response, body) {
      res.send(body);
    });


};

module.exports = putFollowPlaylist;

const request = require('request');

const getFollowPlaylist = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    const user = req.query.user;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${user}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      res.send(body);
    });


};

module.exports = getFollowPlaylist;

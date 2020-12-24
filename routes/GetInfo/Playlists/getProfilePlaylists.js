const request = require('request');

const getUsersPlaylists = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id
    
    const authOptions = {
        url: `https://api.spotify.com/v1/users/${id}/playlists`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      res.send({ body });
    });

};

module.exports = getUsersPlaylists;

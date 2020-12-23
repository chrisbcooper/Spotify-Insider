const request = require('request');

const deleteUnfollowPlaylist = async (req, res) => {
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

    await request.delete(authOptions, function (error, response, body) {
      if(response.statusCode === 200) {
        res.send('success');
      } else {
        res.send('failure');
      }
    });


};

module.exports = deleteUnfollowPlaylist;

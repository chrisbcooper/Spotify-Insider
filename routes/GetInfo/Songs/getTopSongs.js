const request = require('request');

const getTopSongs = async (req, res) => {
    const token = req.header('x-auth-token');
    const term = req.query.term;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${term}_term`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      const topSongs = body.items;
      res.send({ topSongs });
    });


};

module.exports = getTopSongs;

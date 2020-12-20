const request = require('request');

const getTopArtists = async (req, res) => {
    const token = req.header('x-auth-token');
    const term = req.query.term;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${term}_term`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) { 
        const topArtists = body.items;
        res.send({ topArtists });
      }
    });


};

module.exports = getTopArtists;

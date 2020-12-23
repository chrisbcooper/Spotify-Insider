const request = require('request');

const putFollow = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    const type = req.query.type;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/following?type=${type}&ids=${id}`,
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

module.exports = putFollow;

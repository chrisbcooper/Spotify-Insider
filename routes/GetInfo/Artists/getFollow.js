const request = require('request');

const getFollow = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    const type = req.query.type;
    console.log(id);
    console.log
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/following/contains?type=${type}&ids=${id}`,
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

module.exports = getFollow;

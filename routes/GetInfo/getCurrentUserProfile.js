const request = require('request');

const getCurrentUserProfile = async (req, res) => {
    const token = req.header('x-auth-token');
    console.log(token);
    
    const authOptions = {
        url: 'https://api.spotify.com/v1/me/',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.send({ body });
      }
    });

};

module.exports = getCurrentUserProfile;

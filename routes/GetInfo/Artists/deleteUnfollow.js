const request = require('request');

const deleteUnfollow = async (req, res) => {
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

    await request.delete(authOptions, function (error, response, body) {
      if(response.statusCode === 204) {
        res.send('success');
      } else {
        res.send('failure');
      }
      
    });


};

module.exports = deleteUnfollow;

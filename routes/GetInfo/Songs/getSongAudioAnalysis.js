const request = require('request');

const getSongAudioAnalysis = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/audio-analysis/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.send({ body });
      }
    });

};

module.exports = getSongAudioAnalysis;

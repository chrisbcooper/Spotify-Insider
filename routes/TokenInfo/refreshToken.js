const request = require('request');
const { client_secret, client_id } = require('../../Setters/credentials');
const spotify = require('../../Setters/credentials');

const refreshToken = async(req, res) => {

    const refresh_token = req.query.refresh_token;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
            'base64',
          )}`,
        },
        form: {
          grant_type: 'refresh_token',
          refresh_token,
        },
        json: true,
      };

      await request.post(authOptions, function (error, response, body) {
        console.log(body);
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          res.send({ access_token });
        }
    });

}

module.exports = refreshToken;
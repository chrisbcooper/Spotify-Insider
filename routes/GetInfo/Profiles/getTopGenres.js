const request = require('request');

const getTopGenres = async (req, res) => {
    const token = req.header('x-auth-token');
    const term = req.query.term;
    
    const authOptions = {
        url: `https://api.spotify.com/v1/me/top/artists?limit=100&time_range=${term}_term`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        json: true
      };

    await request.get(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
        const genres = {};
        const topGenres = [];
        const artists = body.items;

        for(let i = 0; i < artists.length; i++) {
            for(let j = 0; j < artists[i].genres.length; j++) {
                if(genres[artists[i].genres[j]] != null) {
                    genres[artists[i].genres[j]] = genres[artists[i].genres[j]] + 1;
                } else {
                    genres[artists[i].genres[j]] = 1;
                }
            }
        }


        for(const g in genres) {
            topGenres.push([g, genres[g]]);
        }

        topGenres.sort((a,b) => (b[1]) - a[1]);
        const newTopGenres = topGenres.slice(0, 10);
        res.send(newTopGenres);
      }
    });

};

module.exports = getTopGenres;

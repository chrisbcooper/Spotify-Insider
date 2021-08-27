const request = require('request');

const postCreatePlaylist = async (req, res) => {
    const token = req.header('x-auth-token');
    const id = req.query.id;
    const queryName = req.query.name;
    const profile = req.query.profile;


    const description = profile === 'true' ? 
    'This is a playlist created based on what you listen to. It was created by Spotify Insider'
    :`This is a playlist created based on the songs in the playlist ${queryName}. It was created with Spotify Insider`

    
    const name = profile === 'true' ? 
    'Recommended Playlist based on what you listen to' : 
    `Recommended Playlist Based on ${queryName}`

    const authOptions = {
        url: `https://api.spotify.com/v1/users/${id}/playlists`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
            name,
            public: false,
            description
        },
        json: true
      };

    await request.post(authOptions, function (error, response, body) {
      res.send(body);
    });
};

module.exports = postCreatePlaylist;

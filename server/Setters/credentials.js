require('dotenv').config();

const spotify = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI || "http://localhost:5000/api/callback",
    client_uri: process.env.CLIENT_URI || "http://localhost:3000"
  };

module.exports = spotify;

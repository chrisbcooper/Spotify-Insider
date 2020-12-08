const express = require('express');
const config = require('config');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();

app.use(cors());
app.unsubscribe(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true}));

const authorizeSpotify = require('./routes/authorizeSpotify.js');
const getAccessToken = require('./routes/getAccessToken.js');
const getRecentlyPlayed = require('./routes/getRecentlyPlayed');


const db = new Datastore();


app.get('/login', authorizeSpotify);
app.get('/callback', getAccessToken, (req, res, next) => {
    db.insert(req.credentials, err => {
        if(err) {
            next(err);
        } else {
            res.redirect(`${process.env.CLIENT_URL}/?authorized=true`);
        }
    })
});
app.get('/history', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
          throw Error('Failed to retrieve documents');
        }

        const accessToken = docs[0].access_token;
        getRecentlyPlayed(accessToken)
          .then(data => {
            const arr = data.map(e => ({
              played_at: e.played_at,
              track_name: e.track.name,
            }));

            console.log('ARR');
            console.log(arr);
            res.json(arr);
          })
          .catch(err => console.log(err));
      });
});





app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

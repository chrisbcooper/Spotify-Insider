const express = require('express');
// const connectDB = require('./config/db');
// const path = require('path');
const config = require('config');

const app = express();

//Connect Database
//connectDB();

//Init Middleware
//app.use(express.json({ extended: false }));

//Define routes
//app.use('/api/users', require('./routes/api/users'));

// //Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   //Set the static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.get('/', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + config.get('clientID') +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(config.get('redirectURI')));
    });

app.get('/success', (req, res) => {
    res.send('The code is ' + req.query("code"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

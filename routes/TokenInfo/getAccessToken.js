const fetch = require('node-fetch');
const spotify = require('../../Setters/credentials');

const getAccessToken = (req, res) => {

    const {code} = req.query;

    if(code) {
        const url = 'https://accounts.spotify.com/api/token';


        const data = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: spotify.redirect_uri,
            client_id: spotify.client_id,
            client_secret: spotify.client_secret
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };

        const searchParams = new URLSearchParams();

        Object.keys(data).forEach(prop => {
            searchParams.set(prop, data[prop]);
        })
    

        fetch(url, {
            method: 'POST',
            headers,
            body: searchParams
        })
        .then(res => res.json())
        .then(credentials => {
            res.redirect(`${process.env.CLIENT_URL}/profile?&access_token=${credentials.access_token}&refresh_token=${credentials.refresh_token}`);
        })
        
    }

}

module.exports = getAccessToken;
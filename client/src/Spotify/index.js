import axios from 'axios';
import {getParams} from '../Utils';

const expTime = 3600 * 1000;


const setTimeStamp = () => window.localStorage.setItem('spotify_timestamp', Date.now());
const setAccessToken = token => {
    setTimeStamp();
    window.localStorage.setItem('spotify_access_token', token);
}
const setRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);

export const refreshAccessToken = async () => {
    
    if(getRefreshToken() && getRefreshToken() != 'undefined') {
        try {
            console.log('we got here tho');
            const {data} = await axios.get(`/refresh_token?refresh_token=${getRefreshToken()}`);
            console.log('did we get here');
            const {access_token} = data;
            setAccessToken(access_token);
            window.location.reload();
            return;
        } catch(e) {
            console.log(e);
        }
        
    }
    
}


const getTokenTimestamp = () => window.localStorage.getItem('spotify_timestamp');
const getAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

export const receieveAccessToken = () => {

    const {accessToken, refreshToken} = getParams();

    console.log(`DATE NOW ${Date.now()} - getTokenTimeStamp() ${getTokenTimestamp()}`);
    console.log(`EQUALS ${Date.now() - getTokenTimestamp()}`)
    if(Date.now() - getTokenTimestamp() > expTime) {
        console.log('Acess token expired, refreshing to get new one');
        refreshAccessToken();
    }

    var localAccessToken = getAccessToken();
    var localRefreshToken = getRefreshToken();

    if(!localRefreshToken|| localRefreshToken == 'undefined') {
        setRefreshToken(refreshToken);
    }

    if(!localAccessToken) {
        setAccessToken(accessToken);
        console.log(`EARLY ${accessToken}`);
        return accessToken;
    }
    console.log(localAccessToken);
    return localAccessToken;
}

export const token = receieveAccessToken();


export const logout = () => {
    window.localStorage.removeItem('spotify_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };
import axios from 'axios';

import {getParams, isNull} from '../Utils';

const expTime = 3600 * 1000;


const setTimeStamp = () => window.localStorage.setItem('spotify_timestamp', Date.now());
const setAccessToken = token => {
    if(token) {
        setTimeStamp();
    }
    window.localStorage.setItem('spotify_access_token', token);
}
const setRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);

export const refreshAccessToken = async () => {
    
    if(!isNull(getRefreshToken())) {
        try {
            const {data} = await axios.get(`/refresh_token?refresh_token=${getRefreshToken()}`);
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

    var localAccessToken = getAccessToken();
    var localRefreshToken = getRefreshToken();

    if(isNull(accessToken) && isNull(refreshToken) && isNull(localAccessToken) && isNull(localRefreshToken)) {
        return null;
    }

    if(Date.now() - getTokenTimestamp() > expTime) {
        console.log('Acess token expired, refreshing to get new one');
        refreshAccessToken();
    }



    if(isNull(localRefreshToken)) {
        setRefreshToken(refreshToken);
    }

    if(isNull(localAccessToken)) {
        setAccessToken(accessToken);
        return accessToken;
    }

    return localAccessToken;
}

export const token = receieveAccessToken();


export const logout = () => {
    window.localStorage.removeItem('spotify_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/';
  };


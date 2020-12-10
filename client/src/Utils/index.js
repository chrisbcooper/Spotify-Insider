
export const getParams = () => {

    const params = {};

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    
    params['accessToken'] = accessToken;
    params['refreshToken'] = refreshToken;

    return params;

}
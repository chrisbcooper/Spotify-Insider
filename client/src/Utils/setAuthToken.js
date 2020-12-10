import axios from 'axios';

//Sets the header of the request with the current token if there is one
const setAuthToken = (token) => {
  if (token) {
    console.log('WE SET THE AUTH TOKEN');
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
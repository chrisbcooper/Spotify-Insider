import axios from 'axios';
require('dotenv').config();

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
};

const client = axios.create({
	baseURL: `${process.env.URL}`,
	timeout: 20000,
	headers: headers,
});

export const setAuthToken = (token) => {
	if (token) {
		client.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete client.defaults.headers.common['x-auth.token'];
	}
};

export default client;

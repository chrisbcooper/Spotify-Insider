export const getParams = () => {
	const params = {};

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const accessToken = urlParams.get('access_token');
	const refreshToken = urlParams.get('refresh_token');

	params['accessToken'] = accessToken;
	params['refreshToken'] = refreshToken;

	return params;
};

export const isNull = (value) => {
	if (value === false) {
		return false;
	}
	return !value || value === 'undefined' || value === 'null';
};

export const stars = (pop) => {
	switch (true) {
		case pop >= 90:
			return '★★★★★';
		case pop >= 80:
			return '★★★★';
		case pop >= 65:
			return '★★★';
		case pop >= 50:
			return '★★';
		case pop >= 35:
			return '★';
		default:
			return '';
	}
};

export const pitchNumber = (note) => {
	let key = note;

	switch (note) {
		case 0:
			key = 'C';
			break;
		case 1:
			key = 'D♭';
			break;
		case 2:
			key = 'D';
			break;
		case 3:
			key = 'E♭';
			break;
		case 4:
			key = 'E';
			break;
		case 5:
			key = 'F';
			break;
		case 6:
			key = 'G♭';
			break;
		case 7:
			key = 'G';
			break;
		case 8:
			key = 'A♭';
			break;
		case 9:
			key = 'A';
			break;
		case 10:
			key = 'B♭';
			break;
		case 11:
			key = 'B';
			break;
		default:
			return null;
	}

	return key;
};

export const milliToSeconds = (duration) => {
	var seconds = Math.floor(duration / 1000);
	var minutes = Math.floor(seconds / 60);
	seconds = seconds - 60 * minutes;
	seconds = seconds > 10 ? seconds : `0${seconds}`;
	return `${minutes}:${seconds}`;
};

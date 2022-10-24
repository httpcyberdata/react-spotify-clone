const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
	const code = req.body.code;
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000',
		clientId: '688a500315c249bdb62b01432f70b15b',
		clientSecret: '56a43a57b4ec419f9990fa85b7c4a8b1'
	})

	spotifyApi.authorizationCodeGrant(code)
	.then(data => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	})
	.catch(() => {
		res.sendStatus(400)
	})
});

app.listen(3001)
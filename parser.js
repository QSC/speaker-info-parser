require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.API_KEY;
const sheetId = process.env.SHEET_ID;
const sheetRange = 'Sheet1';

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}&alt=csv`;

axios.get(url)
	.then(response => {
		// Handle the response data
		console.log(response.data);
	}).catch(error => {
		// Handle errors
		console.error('There was an error fetching the data:', error);
	});
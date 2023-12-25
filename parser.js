const axios = require('axios');
const fs = require('fs'); // Node.js file system module

const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const sheetId = 'YOUR_SHEET_ID';
const apiKey = 'YOUR_API_KEY'; // If using an API key

// Construct the URL to retrieve the sheet in CSV format
const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetId}&key=${apiKey}`;

// Make a GET request to fetch the CSV data
axios.get(url)
	.then(response => {
		if (response.status !== 200) {
			throw new Error('Failed to fetch data');
		}
		// Write the CSV data to a file
		fs.writeFileSync('data.csv', response.data);
		console.log('CSV data has been saved to data.csv');
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});
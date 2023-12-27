const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('speaker_data.csv')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {

		console.log(results)

		const output = results.filter(speaker => {
			let empty = true
			for (const key of Object.keys(speaker))
			{
				if(speaker[key]) {
					empty = false
				}
			}
			return !empty
		})

		const jsonData = JSON.stringify(output, null, 2);
		fs.writeFile('speaker_data.json', jsonData, (err) =>
		{
			if (err)
			{
				console.error('Error writing JSON file:', err);
				return;
			}
			console.log('JSON file has been saved!');
		})
	});

const fs = require('fs');
const csv = require('csv-parser');

let results = [];

fs.createReadStream('speaker_data.csv')
	.pipe(csv())
	.on('data', (data) => results.push(data))
	.on('end', () => {

		// take out empty lines
		results = results.filter(speaker =>
		{
			let empty = true
			for (const key of Object.keys(speaker))
			{
				if (speaker[key])
				{
					empty = false
				}
			}
			return !empty
		})

		// formatted into arrays for each year
		const formattedResults = {}
		for (const speaker of results)
		{
			// trim leading/trailing whitespace on string fields
			Object.keys(speaker).forEach(k => speaker[k] = typeof speaker[k] == 'string' ? speaker[k].trim() : speaker[k]);

			const year = speaker.year
			if (!formattedResults[year])
			{
				formattedResults[year] = []
			}
			delete speaker.year
			formattedResults[year].push(speaker)
		}

		const jsonData = JSON.stringify(formattedResults, null, 2);
		fs.writeFile('speaker_data.json', jsonData, (err) =>
		{
			if (err)
			{
				console.error('Error writing JSON file:', err);
				return;
			}
			console.log('JSON file has been saved!');
		})
	})


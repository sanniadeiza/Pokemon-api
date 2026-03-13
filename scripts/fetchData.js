const fs = require('fs');
const path = require('path');
const https = require('https');

const dataFile = path.join(__dirname, '../data/pokemon.json');

https.get('https://pokeapi.co/api/v2/pokemon?limit=1100', (res) => {
    let data = '';
    
    res.on('data', chunk => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            const pokemons = response.results.map((p, index) => ({
                id: index + 1,
                name: p.name,
                url: p.url,
                description: `A wild ${p.name} appeared!`
            }));
            
            fs.writeFileSync(dataFile, JSON.stringify(pokemons, null, 2));
            console.log(`Successfully fetched and saved ${pokemons.length} Pokémon!`);
        } catch (error) {
            console.error('Error parsing data:', error);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data:', err.message);
});

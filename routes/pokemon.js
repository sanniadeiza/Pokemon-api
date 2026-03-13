const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const dataFile = path.join(__dirname, '../data/pokemon.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

/**
 * @route GET /api/pokemon
 * @desc Get all pokemon (Paginated max 20, cached)
 * @access Public
 */
router.get('/', cacheMiddleware, (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pokemons = readData();

    const results = {};
    if (endIndex < pokemons.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.totalCount = pokemons.length;
    results.results = pokemons.slice(startIndex, endIndex);

    res.json(results);
});

/**
 * @route POST /api/pokemon
 * @desc Add a new pokemon
 * @access Private (Admin)
 */
router.post('/', authMiddleware, (req, res) => {
    const { name, url, description } = req.body;
    
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const pokemons = readData();
    const newId = pokemons.length > 0 ? Math.max(...pokemons.map(p => p.id)) + 1 : 1;

    const newPokemon = {
        id: newId,
        name,
        url: url || '',
        description: description || `A new wild ${name} appeared!`
    };

    pokemons.push(newPokemon);
    writeData(pokemons);

    res.status(201).json(newPokemon);
});

/**
 * @route PUT /api/pokemon/:id
 * @desc Update a pokemon
 * @access Private (Admin)
 */
router.put('/:id', authMiddleware, (req, res) => {
    const { name, url, description } = req.body;
    const pokemons = readData();
    const index = pokemons.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Pokemon not found' });
    }

    const updatedPokemon = {
        ...pokemons[index],
        name: name || pokemons[index].name,
        url: url || pokemons[index].url,
        description: description || pokemons[index].description
    };

    pokemons[index] = updatedPokemon;
    writeData(pokemons);

    res.json(updatedPokemon);
});

/**
 * @route DELETE /api/pokemon/:id
 * @desc Delete a pokemon
 * @access Private (Admin)
 */
router.delete('/:id', authMiddleware, (req, res) => {
    const pokemons = readData();
    const index = pokemons.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Pokemon not found' });
    }

    const deletedPokemon = pokemons.splice(index, 1);
    writeData(pokemons);

    res.json({ message: 'Pokemon deleted successfully', deleted: deletedPokemon[0] });
});

module.exports = router;

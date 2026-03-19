const request = require('supertest');
const app = require('../server');

describe('Pokemon API', () => {
    it('should get a list of pokemon', async () => {
        const res = await request(app).get('/api/pokemon');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('results');
        expect(Array.isArray(res.body.results)).toBe(true);
    });

    it('should protect POST /api/pokemon', async () => {
        const res = await request(app).post('/api/pokemon').send({ name: 'Pikachu' });
        expect(res.statusCode).toEqual(401);
    });
});

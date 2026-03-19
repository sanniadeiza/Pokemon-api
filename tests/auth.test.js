const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
    it('should login successfully with valid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'admin',
                password: 'password'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail to login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'wrong',
                password: 'wrong'
            });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Invalid Credentials');
    });
});

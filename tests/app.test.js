const request = require('supertest');
require('dotenv').config();
const app = require('../app');

describe('Testes básicos da API', () => {
  it('GET / deve retornar status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});




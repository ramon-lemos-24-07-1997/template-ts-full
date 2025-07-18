const request = require('supertest');
require('dotenv').config();
const app = require('../src/app');

describe('Cenários de testes para /users', () => {
  it('POST /users com dados válidos deve retornar 200', async () => {
    const res = await request(app)
      .post('/users')
      .send({ string: 'nome', numero: 123, booleano: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('POST /users faltando campo obrigatório deve retornar 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ string: 'nome', numero: 123 }); 
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Parâmetros ausentes ou vazios: booleano');
  });

  it('POST /users com tipo errado deve retornar 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ string: 'nome', numero: 'não é número', booleano: true });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it('POST /users com payload vazio deve retornar 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Parâmetros ausentes ou vazios: string, numero, booleano');
  });
});

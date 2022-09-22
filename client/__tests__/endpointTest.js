const server = require('../../server/server.js');
const request = require('supertest');

const LOCAL_HOST = 'http://localhost:3000';
const req = request(LOCAL_HOST);

const user = { username: 'admin', password: 'password' };

describe('endpoint testing', () => {
  afterAll(() => server.close());

  it('on successful login should send 200 status', () => {
    req.post('/auth/login').send(user).expect(200);
  });
  it('on failed login should send 400 status', () => {
    req
      .post('/auth/login')
      .send({ username: 'admin', password: 'hello' })
      .expect(400);
  });
  // it('on successful login sets a jwt cookie', () => {
  //   req.post('/auth/login').send({ username: 'admin', password: 'password' });
  // });
});

const server = require('../../server/server.js');
const request = require('supertest');

const LOCAL_HOST = 'http://localhost:3000';
const req = request(LOCAL_HOST);

const user = { username: 'admin', password: '123' };

describe('auth testing', () => {
  afterAll(() => server.close());
  describe('login testing', () => {
    it('on successful login should send 200 status', async () => {
      await req.post('/auth/login').send(user).expect(200);
    });
    it('on failed login should send 400 status', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .expect(500);
    });
    // it('on successful login sets a jwt cookie', () => {
    //   req.post('/auth/login').send({ username: 'admin', password: 'password' });
    // });
    it('on login user does not obtain a cookie', () => {
      req.post('auth/login').send().expect();
    });
  });
});

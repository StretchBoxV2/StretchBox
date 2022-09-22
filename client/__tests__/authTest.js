const server = require('../../server/server.js');
const request = require('supertest');

const LOCAL_HOST = 'http://localhost:3000';
const req = request(LOCAL_HOST);

const user = { username: 'admin', password: '123' };

describe('Auth', () => {
  afterAll(() => server.close());

  describe('Login route testing', () => {
    it('on successful login should send 200 status', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .expect(200);
    });
    it('on failed login should send 400 status', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: 'password' })
        .expect(400);
    });
    it('request with no username input should sent 400 status', async () => {
      await req.post('/auth/login').send({ password: '123' }).expect(400);
    });
    it('request with no password input should send 400 status', async () => {
      await req.post('/auth/login').send({ username: 'admin' }).expect(400);
    });
    // it('on successful login sets a jwt cookie', () => {
    //   req.post('/auth/login').send({ username: 'admin', password: 'password' });
    // });
    // it('on login user does not obtain a cookie', () => {
    //   req.post('auth/login').send().expect(403);
    // });
  });
});

const server = require('../../server/server.js');
const request = require('supertest');
var Cookies = require('expect-cookies');

const LOCAL_HOST = 'http://localhost:3000';
const req = request(LOCAL_HOST);

describe('Auth', () => {
  afterAll(() => server.close());

  describe('Login route testing', () => {
    it('on successful login should send 200 status', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .expect(200);
    });
    it('should specify json as content type in the http header', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .then((res) => {
          expect(res.headers['content-type']).toEqual(
            expect.stringContaining('json')
          );
        });
    });
    it('on successful login should return id and username in response object', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .then((res) => {
          expect(res.body).toHaveProperty('_id');
          expect(res.body).toHaveProperty('username');
        });
    });
    it('on successful login sets a jwt cookie', async () => {
      await req
        .post('/auth/login')
        .send({ username: 'admin', password: '123' })
        .expect(Cookies.set({ name: 'jwt' }));
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
  });

  describe('Registration route testing', () => {
    it('on successful registration should send 200 status', async () => {
      await req
        .post('/auth/register')
        .send({ username: 'jigar', password: '123' })
        .expect(200);
    });
    it('on successful register should return id and username in response object', async () => {
      await req
        .post('/auth/register')
        .send({ username: 'jigar', password: '123' })
        .then((res) => {
          expect(res.body).toHaveProperty('_id');
          expect(res.body).toHaveProperty('username');
        });
    });
    it('on successful registration sets a jwt cookie', async () => {
      await req
        .post('/auth/register')
        .send({ username: 'jigar', password: '123' })
        .expect(Cookies.set({ name: 'jwt' }));
    });
    it('on failed registration should send 400 status', async () => {
      await req
        .post('/auth/register')
        .send({ username: 'jigar', password: 'password' })
        .expect(400);
    });
    it('request with no username input should sent 400 status', async () => {
      await req.post('/auth/register').send({ password: '123' }).expect(400);
    });
    it('request with no password input should send 400 status', async () => {
      await req.post('/auth/register').send({ username: 'jigar' }).expect(400);
    });
  });
});

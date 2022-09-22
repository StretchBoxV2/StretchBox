import request from 'supertest';
import makeApp from './app.js';
import { jest } from '@jest/globals';

import userController from '../../server/controllers/userController';
import jwtController from '../../server/controllers/jwtController';

describe('auth unit tests', () => {
  describe('userController unit tests', () => {
    describe('createUser unit tests', () => {
      it('input has a username field', () => {
        const user = { password: password };
        expect(userController.createUser(user));
      });
    });
  });
});

// it('input has a username field', () => {
//     const createUser = jest.fn(); // jest.fn() tests the interaction between the server and the datatbase. Keeps track of what's passed into the function every time it's called.
//     const app = makeApp({createUser}); // passing jest.fn() into app inside an object. App expects a database object that contains a createUser function.

//     describe("Post /users", () => {

//         beforeEach(() => {
//             createUser.mockReset() // Resets all information stored in the mock, including any initial implementation and mock name given. This is useful when you want to completely restore a mock back to its initial state.
//         })

//     describe("when passed a username and password", () => {
//         test("should save the username and password in the database", () => {

//             const body = {
//                 username: "username",
//                 password: "password"
//             }

//             const response = await request(app).post("/users").send(body)
//             expect(createUser.mock.calls[0][0].toBe(body.username)) // represents the data that gets passed in the first time it's called
//             expect(createUser.mock.calls[0][1].toBe(body.password)) // represents the password

//         })
//     })

//     })
//   });

// Need to test auth (done via login and registration) and test our cookie

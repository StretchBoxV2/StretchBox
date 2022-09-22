const db = require('../models/model');
const userController = {};
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

userController.createUser = async (req, res, next) => {
  if (!req.body.username)
    return next({
      log: null,
      status: 400,
      message: 'Username required',
    });
  if (!req.body.password)
    return next({
      log: null,
      status: 400,
      message: 'Password required',
    });

  try {
    const hash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    const values = [req.body.username, hash];
    const userQuery = `
      INSERT INTO users(username, password)
      VALUES($1, $2)
      RETURNING _id, username;
    `;
    const user = await db.query(userQuery, values);
    res.locals.user = {
      _id: user.rows[0]._id,
      username: user.rows[0].username,
    };
    return next();
  } catch (e) {
    return next({
      log: 'userController.createUser ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error creating user' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const values = [req.body.username];
    const userQuery = `
      SELECT * 
      FROM users
      WHERE username=$1;
    `;
    const user = await db.query(userQuery, values);
    if (!user.rows.length)
      return next({
        log: null,
        status: 500,
        message: {
          err: 'Invalid Username or password',
        },
      });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );

    if (validPassword) {
      res.locals.user = {
        _id: user.rows[0]._id,
        username: user.rows[0].username,
      };
      return next();
    }
    return next({
      log: null,
      status: 500,
      message: {
        err: 'Invalid Username or password',
      },
    });
  } catch (err) {
    return next({
      log: 'userController.verifyUser ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error verifying user' },
    });
  }
};

module.exports = userController;

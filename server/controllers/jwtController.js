const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwtController = {};

jwtController.write = (req, res, next) => {
  const { _id, username } = res.locals.user;
  res.cookie(
    'jwt',
    jwt.sign(
      {
        _id,
        username,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )
  );
  return next();
};

jwtController.verify = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next({
      log: null,
      status: 401,
      message: 'You are not logged in',
    });
  }
  try {
    res.locals.user = jwt.verify(req.cookies.jwt, JWT_SECRET);
    return next();
  } catch (err) {
    next({
      log: 'jwtController.verify ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error verifying jwt cookie' },
    });
  }
};

module.exports = jwtController;

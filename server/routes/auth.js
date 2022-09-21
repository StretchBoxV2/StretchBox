const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');

router.post(
  '/register',
  userController.createUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/login',
  userController.verifyUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.get('/login', jwtController.verify, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.delete('/login', (req, res) => {
  res.clearCookie('jwt').sendStatus(204);
});

module.exports = router;

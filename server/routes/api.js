const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
const jwtController = require('../controllers/jwtController');

router.post(
  '/',
  // jwtController.verify,
  apiController.getExercises,
  (req, res) => {
    // console.log('server res.locals.stretches', res.locals.stretches);
    res.status(200).json(res.locals.stretches);
  }
);

router.post(
  '/favorites',
  jwtController.verify,
  apiController.addFavorites,
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;

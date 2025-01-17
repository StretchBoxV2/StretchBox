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

router.get(
  '/favorites',
  jwtController.verify,
  apiController.getFavorites,
  (req, res) => {
    res.status(200).json(res.locals.favorites);
  }
);

router.delete(
  '/favorites',
  jwtController.verify,
  apiController.deleteFavorites,
  (req, res) => {
    res.sendStatus(204);
  }
);

module.exports = router;

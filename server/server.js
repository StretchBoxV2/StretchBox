const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiController = require('./controllers/apiController');
const userController = require('./controllers/userController');
const jwtController = require('./controllers/jwtController');

app.post(
  '/register',
  userController.createUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

app.post(
  '/login',
  userController.verifyUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

app.post('/api', apiController.getExercises, (req, res) => {
  // console.log('server res.locals.stretches', res.locals.stretches);
  res.status(200).json(res.locals.stretches);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('*', (req, res) => {
  res.status(404).send('There are no stretches over here.');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, function () {
  console.log('App listening on port: ' + port);
});

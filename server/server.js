const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth.js');
const apiRouter = require('./routes/api.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

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

const PORT = 3000;
app.listen(PORT, function () {
  console.log('App listening on port: ' + PORT);
});

module.exports = app;

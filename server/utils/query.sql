-- // This is for populating the database... no need to run it anymore
-- const request = require('request');
-- const database = require('./models/model');
-- function fetchApi(variable) {
--   let muscleGroup = variable;
--   const options = {
--     url:
--       'https://api.api-ninjas.com/v1/exercises?type=stretching&muscle=' +
--       muscleGroup,
--     headers: {
--       'X-Api-Key': 'yPvp7DZtvxsNwvYebl/CbA==Qp9XuU0upuR0x5BD',
--     },
--   };

--   function callback(error, response, body) {
--     if (error) return console.error('Request failed:', error);
--     else if (response.statusCode != 200)
--       return console.error(
--         'Error:',
--         body.statusCode,
--         response.toString('utf8')
--       );
--     // request(options, callback)
--     const exercises = JSON.parse(body);

--     // console.log(exercises)
--     //returnArr will contain the new objects that we want to add to the database
--     let returnArr = [];
--     for (let i = 0; i < exercises.length; i++) {
--       const { name, muscle, instructions } = exercises[i];
--       returnArr.push({
--         name: name,
--         muscle: muscle,
--         instructions: instructions,
--       });
--     }
--     // iterate through returnArr to add each object to the database
--     for (let i = 0; i < returnArr.length; i++) {
--       console.log(returnArr[i].name);
--       // declare query text
--       const text = `INSERT INTO stretches(name, ${returnArr[i].muscle}, instructions) VALUES($1, $2, $3)`;
--       // declare the values
--       const values = [returnArr[i].name, true, returnArr[i].instructions];
--       // db query
--       database
--         .query(text, values)
--         .then((response) => {
--           console.log('post response: done');
--         })
--         .catch((err) => {
--           console.error('saveStretch error');
--         });
--     }
--     return returnArr;
--   }
--   //request is a specific way to call to this API
--   request(options, callback, muscleGroup);
--   // console.log(test);
-- }

-- const muscleGroups = [
--   'abdominals',
--   'abductors',
--   'adductors',
--   'biceps',
--   'calves',
--   'chest',
--   'forearms',
--   'glutes',
--   'hamstrings',
--   'lats',
--   'lower_back',
--   'middle_back',
--   'neck',
--   'quadriceps',
--   'traps',
--   'triceps',
-- ];
-- const databaseQuery = () => {
--   for (let i = 0; i < muscleGroups.length; i++) {
--     fetchApi(muscleGroups[i]);
--   }
--   return;
-- };
-- databaseQuery();
-- // DB URL (to connect to postgress - use command 'psql -d postgres://drivmmdq:dOrUoYjYc18tWPvker0q2wcNbB6BRuGm@jelani.db.elephantsql.com/drivmmdq')

CREATE TABLE stretches
(
  name varchar(255),
  instructions varchar(1000),
  img varchar(1000),
  neck varchar(255),
  abdominals varchar(255),
  abductors varchar(255),
  adductors varchar(255),
  biceps varchar(255),
  calves varchar(255),
  forearms varchar(255),
  glutes varchar(255),
  hamstrings varchar(255),
  lats varchar(255),
  lower_back varchar(255),
  middle_back varchar(255),
  quadriceps varchar(255),
  traps varchar(255),
  triceps varchar(255),
  stretch_id varchar(255),
   _id SERIAL PRIMARY KEY
);

\COPY stretches FROM '/Users/jigar/Downloads/stretches.csv' CSV HEADER DELIMITER '@';


CREATE TABLE users 
(
  _id SERIAL PRIMARY KEY,
  username varchar(255) UNIQUE,
  password varchar(255)
);

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


CREATE TABLE favorites
(
  _id SERIAL PRIMARY KEY,
  FOREIGN KEY (user) REFERENCES users(_id)
  FOREIGN KEY (stretches) REFERENCES stretches(_id)
);


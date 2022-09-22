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
  chest varchar(255),
  forearms varchar(255),
  glutes varchar(255),
  hamstrings varchar(255),
  lats varchar(255),
  lower_back varchar(255),
  middle_back varchar(255),
  quadriceps varchar(255),
  traps varchar(255),
  triceps varchar(255),
  stretch_id varchar(255) PRIMARY KEY
);

\COPY stretches FROM '/Users/jigar/Downloads/stretches.csv' CSV HEADER DELIMITER '@';


CREATE TABLE public.users 
(
  _id SERIAL PRIMARY KEY NOT NULL,
  username varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE  public.favorites (
	_id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  stretch_id varchar(255) NOT NULL,
	FOREIGN KEY ("user_id") REFERENCES public.users("_id"),
	FOREIGN KEY ("stretch_id") REFERENCES  public.stretches("stretch_id")
);


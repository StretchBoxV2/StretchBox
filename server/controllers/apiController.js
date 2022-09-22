const db = require('../models/model');

const apiController = {};

//This api takes in all keys from req.body then makes an individual call to the database
//it then randomly selects one stretch from the call and returns it to res.locals
apiController.getExercises = async (req, res, next) => {
  // console.log(req.body);
  const keysArr = Object.keys(req.body);
  // console.log(keysArr);
  // create an array of stretch objs to send back
  const stretchArr = [];
  for (let i = 0; i < keysArr.length; i++) {
    // grab the current key in keys array, and use that to get the value in req.body for that key
    let key = keysArr[i];
    let value = req.body[key];

    let text = `SELECT * FROM stretches WHERE 'true' in (neck, abdominals, abductors, adductors, biceps, calves, forearms, glutes, hamstrings, lats, lower_back, middle_back, quadriceps, traps, triceps)`;
    // query the database for that muscle for that # of stretches
    await db
      .query(text)
      .then((resp) => {
        // if the value is greater or equal to resp.rows.length
        if (value >= resp.rows.length) {
          // push all rows to array
          for (let i = 0; i < resp.rows.length; i++) {
            stretchArr.push({
              muscle: key,
              name: resp.rows[i].name,
              instructions: resp.rows[i].instructions,
              _id: resp.rows[i]._id,
            });
          }
        } else {
          // else push random value number of rows to array
          let keys = [];
          let i = 0;
          while (value > i) {
            let index = Math.floor(Math.random() * (resp.rows.length - 0));
            if (keys.indexOf(index) > -1) continue;
            const stretch = {
              muscle: key,
              name: resp.rows[index].name,
              instructions: resp.rows[index].instructions,
              _id: resp.rows[index]._id,
            };
            // save the returned stretch objs in stretchArr
            stretchArr.push(stretch);
            keys.push(index);
            i++;
          }
        }
      })

      .catch((err) => {
        console.log('create stretch array error: ' + err);
        return next({
          log: 'create stretch array error',
          message: { err: 'create stretch error' },
        });
      });
  }
  // save stretchArr to res.locals to be sent back in the following middleware
  res.locals.stretches = stretchArr;
  // console.log('final stretchArr', stretchArr);
  next();
};

apiController.addFavorites = async (req, res, next) => {
  try {
    const values = [res.locals.user._id, req.body.stretch_id];
    const queryText = `
      INSERT INTO favorites (user_id, stretch_id)
      VALUES($1, $2)
    `;

    db.query(queryText, values);

    return next();
  } catch (err) {
    return next({
      log: 'apiController.addFavorites ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error adding favorite stretch' },
    });
  }
};

apiController.getFavorites = async (req, res, next) => {
  try {
    const values = [res.locals.user._id];
    const queryText = `
      SELECT *
      FROM favorites
      JOIN users on favorites.user_id=users._id
      JOIN stretches on favorites.stretch_id=stretches._id
      WHERE favorites.user_id=$1
    `;
    let favorites = await db.query(queryText, values);
    favorites = favorites.rows.map((row) => {
      return {
        name: row.name,
        instructions: row.instructions,
        muscle: Object.entries(row).find(([key, value]) => value === 'true')[0],
      };
    });

    res.locals.favorites = favorites;

    return next();
  } catch (err) {
    return next({
      log: 'apiController.getFavorites ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error getting favorite stretches' },
    });
  }
};

apiController.deleteFavorites = async (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = apiController;

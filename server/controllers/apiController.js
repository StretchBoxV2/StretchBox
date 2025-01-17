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

    let text = `SELECT * FROM stretches WHERE ${key}='true'`;
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
              _id: resp.rows[i].stretch_id,
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
              _id: resp.rows[index].stretch_id,
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

    const insert = await db.query(queryText, values);

    if (!insert)
      return next({
        log: 'apiController.addFavorites ERROR: ' + err,
        status: 500,
        message: { err: 'ERROR: Error adding favorite stretch' },
      });

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
      JOIN stretches on favorites.stretch_id=stretches.stretch_id
      WHERE favorites.user_id=$1
    `;
    let favorites = await db.query(queryText, values);
    favorites = favorites.rows.map((row) => {
      return {
        _id: row.stretch_id,
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
    const values = [res.locals.user._id, req.body.stretch_id];
    const queryText = `
      DELETE FROM favorites
      WHERE favorites.user_id=$1 AND favorites.stretch_id=$2
    `;

    const deleted = await db.query(queryText, values);

    if (!deleted)
      return next({
        log: 'apiController.deleteFavorites ERROR: ' + err,
        status: 500,
        message: { err: 'ERROR: Error deleting favorite stretch' },
      });

    return next();
  } catch (err) {
    next({
      log: 'apiController.deleteFavorites ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error deleting favorite stretch' },
    });
  }
};

module.exports = apiController;

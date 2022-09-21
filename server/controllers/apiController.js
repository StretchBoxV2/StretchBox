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
    let text = `SELECT * FROM stretches WHERE ${key} = 'true'`;
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
          message: { er: 'create stretch error' },
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
      SELECT name, instructions, 
      FROM favorites
      JOIN users on users._id=favorites.user_id
      JOIN stretches on stretches._id=favorites.stretch_id
      WHERE favorites.user_id=$1
    `;
    const favorites = await db.query(queryText, values);

    res.locals.favorites = favorites.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 'apiController.getFavorites ERROR: ' + err,
      status: 500,
      message: { err: 'ERROR: Error getting favorite stretches' },
    });
  }
};

module.exports = apiController;

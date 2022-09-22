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

    let insert = await db.query(queryText, values);

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
//  _id |                   name
// -----+------------------------------------------
//   60 | Calf Stretch Elbows Against Wall
//   61 | Ankle Circles
//    3 | Dynamic chest stretch
//   63 | Knee Circles
//    5 | Behind Head Chest Stretch
//   64 | Single-leg lying cross-over stretch
//    7 | Pass-through stretch with band
//    9 | Exercise ball chest stretch
//   67 | HM Straddle Stretch
//   68 | HM Right Side-Kick
//   11 | Elbows Back
//   69 | Groiners
//   70 | Side Lying Groin Stretch
//   72 | Groin and Back Stretch
//   74 | Lying Bent Leg Groin
//  219 | Hug A Ball
//   95 | Half bird dog
//   23 | Brachialis SMR
//   24 | Seated Biceps
//   30 | Standing Biceps Stretch
//   59 | Peroneals-SMR
//   62 | Anterior Tibialis-SMR
//   65 | Standing hip circle
//   66 | HM Right Leg Swing
//   71 | Side Leg Raises
//   73 | Adductor SMR
//   80 | Adductor/Groin
//   85 | Neck-SMR
//   86 | One Knee To Chest
//   87 | Stomach Vacuum
//   90 | Piriformis SMR
//   88 | Scissor Kick
//   89 | Knee Across The Body
//   93 | Overhead Stretch
//   94 | Bench 300 Band Pull Apart
//   97 | Dancer's Stretch
//   99 | Child's pose
//  101 | Lower back SMR
//  103 | Crossover Reverse Lunge
//  105 | Standing leg swing
//  107 | Standing Hamstring and Calf Stretch
//  110 | Hamstring-SMR
//  112 | Spinal Stretch
//  115 | Middle Back Stretch
//  271 | Chin To Chest Stretch
//   91 | Lying glute stretch
//   96 | Superman
//  100 | Cat Stretch
//  104 | Standing Pelvic Tilt
//  109 | Lying hamstring stretch with band
//   98 | Pelvic Tilt Into Bridge
//  102 | Hug Knees To Chest
//  106 | Toe Touchers
//  108 | Lying Hamstring
//  111 | Rhomboids SMR
//  113 | Upper Back Stretch
//  120 | Upper Back-Leg Grab
//  121 | Dynamic Back Stretch
//  123 | Latissimus dorsi SMR
//  125 | Wrist Circles
//  127 | Chair Lower Back Stretch
//  128 | Sit Squats
//  130 | Iron Crosses (stretch)
//  132 | Lying quad stretch with band
//  137 | Overhead Triceps
//  129 | Quadriceps SMR
//  131 | All Fours Quad Stretch
//  134 | Standing side bend stretch
//  135 | One Handed Hang
//  136 | Looking At Ceiling
//  138 | One Half Locust
//  140 | Side Neck Stretch
//  143 | Lower Back Curl
//  145 | Calf SMR
//  146 | Wall calf stretch
//  287 | Standing Hip Circles
//  149 | Exercise ball torso rotation
//  150 | Seated Overhead Stretch
//  153 | Kneeling Forearm Stretch
//  227 | Kneeling hip flexor stretch
//  230 | Crab single-arm reach
//  264 | Triceps Stretch
//  156 | Standing Soleus And Achilles Stretch
//  157 | Seated Calf Stretch
//  158 | Tricep Side Stretch
//  254 | Standing Gastrocnemius Calf Stretch
//  180 | Leg-Up Hamstring Stretch
//  181 | Lying Glute
//  316 | Standing Toe Touches
//  190 | Seated Glute
//  301 | Windmills
//  199 | One Arm Against Wall
//  318 | Lying groin stretch with band
//  201 | IT Band and Glute Stretch
//  206 | Hip Circles (Prone)
//  214 | Intermediate Hip Flexor and Quad Stretch
//  281 | Iliotibial band SMR
//  217 | Standing Hip Flexors
//  317 | Inchworm

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
        _id: row._id,
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

const router = require('express').Router();
let Exercise = require('../models/exercise.model');
// imports express router & the exerciseSchema

// Gets all the exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error' + err));
});

// Creates a new exercise with the data from the request.body
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  //assigns the re.body data to individual variables

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });
  // uses the variables from earlier to create a new exercise using the exerciseSchema

  newExercise
    .save()
    .then(() => res.json('New exercise created!'))
    .catch(err => res.status(400).json('Error' + err));
  // saves the new exercise to the database then returns a JSON message that it is successful
});

// gets an exercise by ID
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error' + err));
});

// Delete an exercise using its ID
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error' + err));
});

//update an exercise
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise
      .save()
      .then(() => res.json('Exercise updated!'))
      .catch(err => res.status(400).json('Error' + err));
  });
});

module.exports = router;

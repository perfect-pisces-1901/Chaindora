const router = require('express').Router();
const Song = require('../db/models/Song');

router.get('/', (req, res, next) => {
  Song.findAll()
    .then(songStorage => {
      res.json(songStorage);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/', async (req, res, next) => {
  try {
    const newSong = await Song.create(req.body);
    res.json(newSong);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

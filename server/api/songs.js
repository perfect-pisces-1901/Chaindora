const router = require("express").Router();
const Song = require("../db/models/Song");

router.get("/", (req, res, next) => {
  Song.findAll()
    .then(songStorage => {
      res.json(songStorage);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/", async (req, res, next) => {
  try {
    console.log("***********************hit", req.body);
    // TODO - The body is forwarded from an IPFS API response by the seller app. Change the seller app to send a more nicely formatted body.
    const newSong = await Song.create({
      hash: req.body.ipfsHash[0].hash,
      title: req.body.title,
      genre: req.body.genre,
      ethAddress: req.body.ethAddress
    });
    res.json(newSong);
  } catch (error) {
    // console.log('error*****************error', error)
    next(error);
  }
});

module.exports = router;

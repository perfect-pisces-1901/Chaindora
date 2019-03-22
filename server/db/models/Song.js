const Sequelize = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
  title: {
    type: Sequelize.STRING
    // allowNull: false
  },
  artist: {
    type: Sequelize.STRING
    // allowNull: false
  },
  genre: {
    type: Sequelize.STRING
    // allowNull: false
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.shazam.com/resources/6a70bd6acae5578760b35e54e0d1e943d7579ae7/nocoverart.jpg"
  },
  ethAddress: {
    type: Sequelize.STRING
  }
});

module.exports = Song;

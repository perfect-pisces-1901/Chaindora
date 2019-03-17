const Sequelize = require('sequelize')
const db = require('../index');

const Song = db.define('song', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Song;


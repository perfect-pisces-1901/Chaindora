const Sequelize = require('sequelize')
const db = require('../index');

const Song = db.define('song', {
  hash: {
    type: Sequelize.STRING,
  }
})

module.exports = Song;

const Sequelize = require('sequelize')
const db = require('../db');

const Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Playlist;


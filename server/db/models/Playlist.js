const Sequelize = require('sequelize')
const db = require('../index');

const Playlist = db.define('playlist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Playlist;


const Sequelize = require('sequelize')
const db = require('../db');

const Album = db.define('album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.shazam.com/resources/6a70bd6acae5578760b35e54e0d1e943d7579ae7/nocoverart.jpg'
  }
})

module.exports = Album;


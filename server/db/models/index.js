const User = require('./User');
const Album = require('./Album');
const Song = require('./Song');
const Playlist = require('./Playlist');

User.hasMany(Playlist);
Playlist.belongsTo(User);

User.hasMany(Song);
Song.belongsTo(User);

User.hasMany(Album);
Album.belongsTo(User);

Album.hasMany(Song);
Song.belongsTo(Album);

Song.belongsToMany(Playlist, {through: 'collection'});
Playlist.belongsToMany(Song, {through: 'collection'});

module.exports = {
  User,
  Album,
  Song,
  Playlist,
}


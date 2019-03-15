const db = require('./server/db');
const { green, red } = require('chalk');
const Song = require('./server/db/models/Song');

const songs = [
  {
    hash: '948q3fvytngexmhwhx7fvngomiuhjfa8,yc'
  },
  {
    hash: '89mcr4279v4rm67tf3m27x3q9f7hmrt7638'
  },
  {
    hash: '8j9rvjepw8jnc837rfhmx378rhmx82f9req'
  }
]

const seed = () =>
  Promise.all(songs.map(song => Song.create(song)));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log(green('Seeding complete!'));
      return seed();
    })
    .catch(err => {
      console.log(red('Error while seeding!!!!'));
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

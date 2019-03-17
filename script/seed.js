const db = require('../server/db');
const { green, red } = require('chalk');
const Song = require('../server/db/models/Song');

const songs = [
  {
    title: 'Liquid Eyes',
    artist: 'Leo LePuq (aka Vivaldi)',
    genre: 'Classical',
    hash: 'QmavidEGRC2DBgVBkrUGuUVGJo2SsPWgKvYDoxWdMNFd7N' // Vivaldi sonata Emin
  },
  {
    title: 'Fangtime Fantasia (theme from Love Bites)',
    artist: 'Jamie Masterson (aka Haydn)',
    genre: 'Classical',
    hash: 'QmfDzuLyd9mVyjej5TYdEKBbBEbiY6Q1fzhK4F817q1Zxe' // Haydn Cello concerto Dmaj
  },
  {
    title: 'Baby, You Float My Duck',
    artist: 'Big Daddy Lobo Martinez (aka tschaikovsky)',
    genre: 'Classical',
    hash: 'QmefYTDDyfrm2kcqCXhBTBmc9mCwGkP743VbX2wTXM2xqi' // Tschaikovsky Rococco Variations
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

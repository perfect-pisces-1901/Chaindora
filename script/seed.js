const db = require("../server/db");
const { green, red } = require("chalk");
const Song = require("../server/db/models/Song");
const User = require("../server/db/models/User");
const Album = require("../server/db/models/Album");
const Playlist = require("../server/db/models/Playlist");
const moreSongs = require('./first_lines');

const users = [
  {
    name: "cody",
    email: "cody@email.com",
    isArtist: true,
    password: "123"
  },
  {
    name: "Testy McTesterson",
    email: "chaindora@test.com",
    isListener: true,
    password: "123",
    imageUrl:
      "https://static.boredpanda.com/blog/wp-content/uploads/2014/12/72-year-old-club-dj-ruth-flowers__605.jpg"
  }
];

let songs = [
  {
    title: "Liquid Eyes",
    artist: "Leo LePuq (aka Vivaldi)",
    genre: "Classical",
    hash: "QmavidEGRC2DBgVBkrUGuUVGJo2SsPWgKvYDoxWdMNFd7N",
    ethAddress: "0x035A64D5081e19c5461c413Ae05f112576924097",
    imageUrl: "http://2.bp.blogspot.com/-gwYc8WLQ3XA/Us7NnPAHReI/AAAAAAAAAX0/LIdW9PIXJWQ/s1600/(10)+blue+eye+on+water.jpg" // Vivaldi sonata Emin
  },
  {
    title: "Fangtime Fantasia (theme from Love Bites)",
    artist: "Jamie Masterson (aka Haydn)",
    genre: "Classical",
    hash: "QmfDzuLyd9mVyjej5TYdEKBbBEbiY6Q1fzhK4F817q1Zxe",
    ethAddress: "0x035A64D5081e19c5461c413Ae05f112576924097",
    imageUrl: "https://study.com/cimages/videopreview/videopreview-full/dracula_115156.jpg" // Haydn Cello concerto Dmaj
  },
  {
    title: "Baby, You Float My Duck",
    artist: "Big Daddy Lobo Martinez (aka tschaikovsky)",
    genre: "Classical",
    hash: "QmefYTDDyfrm2kcqCXhBTBmc9mCwGkP743VbX2wTXM2xqi", // Tschaikovsky Rococco Variations
    ethAddress: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6",
    imageUrl: "https://s3.distributorcentral.com/uploads/E/9/E95C79509FA17714E2BD8EBE028C18E5.jpg"
  },
  {
    title: "Testy Eyes",
    artist: "Testy McTesterson",
    genre: "Test Hop",
    hash: "QmPnEMYHkRN6M7us9xzKtJ8PVNitmiVopnhfQgTxfEqWFJ",
    imageUrl: "https://i.redd.it/kibbanxp1c2z.jpg",
    ethAddress: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6"
  },
  {
    title: "Test-time Testasia (theme from Test Bites)",
    artist: "Testy McTesterson",
    genre: "Jazzy Test",
    hash: "	QmYWeyeBPEuTZYFGdWn1KE4YhcjRcSywHf4FrtxbtETQfN",
    imageUrl: "https://f4.bcbits.com/img/a0240437292_10.jpg",
    ethAddress: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6"
  },
  {
    title: "Adewoyin Blues",
    artist: "Not David",
    genre: "Scat",
    hash: "QmPDwsEycZc4Rm6Ljkmke3F4EHkt4F4ad8tdWz8rNChX5F",
    imageUrl: "https://cloud.fullstackacademy.com/David-Adewoyin-staff-photo.jpg?mtime=20180919151703",
    ethAddress: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6"
  },
  {
    title: "Testy, You Test My Test",
    artist: "Testy McTesterson",
    genre: "Test and Roll",
    imageUrl: "https://i.redd.it/6dft2z5w9cyz.jpg",
    ethAddress: "0x1a5B3De6De5312762D32749a6af1E9D0791490d6",
    hash: "QmUJ9xJFM1zsYw5hPrijmf4RjgpdbABzC8rW41fDvET1bB"
  }
];

songs = [...songs, ...moreSongs];

const seed = () =>
  Promise.all(
    songs.map(song => Song.create(song)),
    users.map(user => User.create(user)),
    Album,
    Playlist
  );

const main = () => {
  console.log("Syncing db...");
  db.sync({ force: true })
    .then(() => {
      console.log(green("Seeding complete!"));
      return seed();
    })
    .catch(err => {
      console.log(red("Error while seeding!!!!"));
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

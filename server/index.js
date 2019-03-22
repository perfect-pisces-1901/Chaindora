const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db/models/index');
const sessionStore = new SequelizeStore({db});
const app = express();
const PORT = 8080;
module.exports = app;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {

  app.use(volleyball);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(compression());

  app.use(
    session({
      secret: 'blahblahblah',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(path.join(__dirname, '..', 'public')));


  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use('/api', require('./api'));

  app.use('/auth', require('./api/auth'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
}

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}

const syncDb = () => db.sync();

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp()
} else {
  createApp()
}

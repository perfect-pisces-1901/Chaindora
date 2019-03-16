'use strict'

const db = require('./server/db')
const app = require('./server')
const PORT = process.env.PORT
const {magenta, green} = require('chalk')

db.sync()
  .then(() => {
    console.log(green('db synced'))
    app.listen(PORT, () => console.log(magenta(`Listening on port ${PORT}`)))
  })

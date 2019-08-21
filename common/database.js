const mongoose = require('mongoose')
const config = require('./config')

mongoose.Promise = global.Promise
const db = mongoose.createConnection(config.db, { useNewUrlParser: true })

db.on('connected', () => {
  console.log('::: Database has connected')
})

module.exports = db
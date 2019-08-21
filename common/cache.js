const bluebird = require('bluebird')
const redis = require('redis')
const config = require('./config')

bluebird.promisifyAll(redis)

const client = redis.createClient({ 
  host: config.redis 
})

module.exports = client
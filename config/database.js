import mongoose from 'mongoose'

import config from "./app.js"

class Database {
  constructor() {
    this._connect()
  }
  _connect() {
    mongoose.connect(config.db.mongo_connection_string, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

export default new Database();
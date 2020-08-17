// dependencies
const mongoose = require('mongoose');
const log = require('../config/log');

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_ENDPOINT,
} = process.env;

// connect to the database
mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// get notified if the connection was successful or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => log.info(`Connected to the ${DB_NAME} database`));

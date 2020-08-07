/* Dependencies */
require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const log = require('./config/log');
const userRoutes = require('./routes/user');

/* Express initialization */
const app = express();
require('./config/db');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', userRoutes);

/* Status endpoint */
app.get('/status', (req, res) => {
  log.info('API Online');
  res.send('API Online');
});

/* Errors */
app.all('*', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.error(`NOT FOUND: ${req.url} - IP: ${ip} - ${req.headers['user-agent']}`);
  res.sendStatus(404);
});

/* Startup */
const port = process.env.PORT || 7100;
app.listen(port, () => log.info(`API started on port ${port}`));

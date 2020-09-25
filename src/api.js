/* Dependencies */
require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const log = require('./config/log');
const userRoutes = require('./routes/user');
const contentRoutes = require('./routes/content');
const formRoutes = require('./routes/form');
const formAnswerRoutes = require('./routes/formAnswer');
const Response = require('./helpers/Response');
const ErrorTypes = require('./helpers/ErrorTypes');

/* Express initialization */
const app = express();
require('./config/db');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', userRoutes);
app.use('/content', contentRoutes);
app.use('/form', formRoutes);
app.use('/formAnswer', formAnswerRoutes);

/* Status endpoint */
app.get('/status', (req, res) => {
  log.info('API Online');
  res.send(new Response(true));
});

/* Error handler */
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  log.error(error);
  res.status(status).send(new Response(null, ErrorTypes.G000));
});

/* Errors */
app.all('*', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.error(`NOT FOUND: ${req.method} ${req.url} - IP: ${ip} - ${req.headers['user-agent']}`);
  res.status(404).send(new Response(null, ErrorTypes.G001));
});

/* Startup */
const port = process.env.PORT || 3000;
app.listen(port, () => log.info(`API started on port ${port}`));

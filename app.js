const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();
require('./dataBase').getInstance().setModels();

const { PORT } = require('./configs/configs');
const { apiRouter } = require('./routers');
const { Sentry } = require('./logger');

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(Sentry.Handlers.requestHandler());

app.use('/', apiRouter);

app.use(Sentry.Handlers.errorHandler());

app.use('*', (err, req, res, next) => {
  Sentry.captureException(err);

  res
      .status(err.status)
      .json({ text: err.message });
});

app.listen(PORT, () => {
  console.log(`server started to ${PORT}`);
});

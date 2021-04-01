const express = require('express');

require('dotenv').config();
const { PORT } = require('./configs/configs');
const { apiRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.use('*', (err, req, res, next) => {
  res
      .status(err.status)
      .json({ text: err.message });
});

app.listen(PORT, () => {
  console.log(`server started to ${PORT}`);
});

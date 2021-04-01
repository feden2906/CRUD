const express = require('express');

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

app.listen(5000, () => {
  console.log(`server started to ${5000}`);
});

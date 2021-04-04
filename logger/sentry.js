const Sentry = require('@sentry/node');

const { SENTRY_DSN } = require('../configs/configs');

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
});

module.exports = Sentry;

import * as Sentry from '@sentry/node';
import config from "./app.js"

class SentryLogger {

  constructor() {
    this._setLogger()
  }
  _setLogger() {
    Sentry.init({
      dsn: config.sentry.dns
    });
  }

  saveException(err) {
    Sentry.captureException(err);
  }
  saveMessage(message) {
    Sentry.captureMessage(message)
  }

}

export default new SentryLogger();
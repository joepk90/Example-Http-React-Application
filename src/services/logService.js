import * as Sentry from '@sentry/browser';

function init() {
    Sentry.init({ dsn: "https://c72acb23bb18483e92a2471e2965f4af@o390168.ingest.sentry.io/5231212" });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log
}
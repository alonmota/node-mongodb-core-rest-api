const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const promBundle = require('express-prom-bundle');
const winstonInstance = require('./winston');
const routes = require('../index.routes');
const config = require('./config');
const APIError = require('../server/helpers/APIError');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '16mb' }));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true, parameterLimit: 50000 }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable x-total-count header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// Enable prometheus client to send statistics on route /metrics
const metricsHistogram = promBundle({
  buckets: [0.1, 0.4, 0.7],
  includeMethod: true,
  includePath: true,
  customLabels: { year: null },
  transformLabels: labels => Object.assign(labels, { year: new Date().getFullYear() }),
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000,
    },
  },
});

app.use(metricsHistogram);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// mount all routes on /api path
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance,
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    status: err.status,
    message: err.isPublic ? err.message : httpStatus[err.status],
    // TODO estruturar uma documentacao de erros por codigo
    // code: err.code,
    // more_info: 'more_info url on swagger',
    stack: config.env === 'development' ? err.stack : {},
  }),
);

module.exports = app;

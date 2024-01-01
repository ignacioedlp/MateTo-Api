const express = require("express");
const { config } = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const apiRouter = require("./routes/v1");
const cors = require('cors');
const error = require('./middlewares/error.middleware');
const logger = require('./config/logger');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());

// enable files upload
app.use(fileUpload());
// request logging. dev: console | production: file
app.use(morgan('dev'));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// ENVS
config();

// use Json
app.use(express.json());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rutas para usuarios
app.use("/api/v1", apiRouter);
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

//Start server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`server started on port ${PORT} (${process.env.NODE_ENV})`));

module.exports = app;

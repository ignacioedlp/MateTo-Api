import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';
import morgan from 'morgan';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';
import routes from './routes/v1';
import webhooks from './routes/webhooks';
import * as error from './middlewares/error.middleware';
import logger from './config/logger';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());
// enable files upload
app.use(fileUpload());
// request logging. dev: console | production: file
app.use(morgan('dev'));
// secure apps by setting various HTTP headers
app.use(helmet());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes * //

app.use('/api/v1/health', routes.health);
app.use('/api/v1/settings', routes.info);
app.use('/api/v1/cart', routes.cart);
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/comments', routes.comment);
app.use('/api/v1/discounts', routes.discount);
app.use('/api/v1/favorites', routes.favorite);
app.use('/api/v1/colors', routes.color);
app.use('/api/v1/products', routes.product);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/productCategories', routes.productCategory);
app.use('/api/v1/productTypes', routes.productType);
app.use('/api/v1/profile', routes.profile);
app.use('/api/v1/purchases', routes.purchases);
app.use('/api/v1/roles', routes.role);
app.use('/api/v1/ratings', routes.rating);
app.use('/api/v1/vendors', routes.vendor);
app.use('/api/v1/sizes', routes.size);
app.use('/api/v1/users', routes.user);
app.use('/api/v1/orders', routes.order);
app.use('/api/v1/analytics', routes.analytic);

app.use('/webhooks/payments', webhooks.payments);

app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// * Start * //

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => logger.info(`server started on port ${PORT} (${process.env.NODE_ENV})`));
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const productsRouter = require('./routes/products.router');
const reviewRouter = require('./routes/review.router');
const orderRouter = require('./routes/order.router');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan('common'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.join(__dirname)));
app.use(fileUpload({
  useTempFiles: true,
}));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/orders', orderRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;



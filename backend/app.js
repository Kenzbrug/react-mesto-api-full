const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

// const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const registerValidator = require('./middlewares/validators/register');

// подключаемся к БД mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// выводим в консоль, что мы подключились к БД mongo
/* eslint-disable no-console */
mongoose.connection.on('open', () => console.log('DB connected!'));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// подключаем логгер запросов(до обработчиков)
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты /signin и /signup по заданию должны находится в app.js
// роуты, не требующие авторизации, размещаем выше app.use(auth);
app.post('/signin', jsonParser, registerValidator.register, login);
app.post('/signup', jsonParser, registerValidator.register, createUser);

// роуты, требующие авторизации, размещаем ниже app.use(auth);
// app.use(auth);

// роуты, требующие авторизации
app.use('/', router);
// подключаем логгер ошибок (после обработчиков, но до обработчика ошибок)
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

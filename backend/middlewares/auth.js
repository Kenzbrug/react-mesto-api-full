const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {Forbidden} = require('../errors')


const handleAuthError = (res) => {
  throw new Forbidden('Необходима авторизация')
}

const auth = (req, res, next) => {

  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  // извлечём токен
  const token = authorization.replace(/^Bearer /, '');
  let payload
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, JWT_SECRET);
  }
  catch (err) {
    // отправим ошибку, если не получилось
    return handleAuthError(res);
  }
  req.user = payload // записываем пейлоуд в объект запроса
  next();
};

module.exports = auth
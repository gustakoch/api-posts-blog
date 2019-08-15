const auth = require('../config/authenticate.json');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Não foi informado nenhum token' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Erro no token' });
  }

  const scheme = parts[0];
  const token= parts[1];

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token com formato não permitido' });
  }

  jwt.verify(token, auth.secret, (error, decoded) => {
    if (error) return res.status(401).send({ error: 'Token inválido' });

    req.userId = decoded.id;
  });

  return next();
};

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../config/authenticate.json');

module.exports = {
  async registerNewUser(req, res) {
    const email = req.body.email;

    try {
      if (await user.findOne({ email })) {
        return res.status(400).json({
          error: 'O e-mail informado já existe!',
        });
      }

      const data = await user.create(req.body);
      data.password = undefined;

      return res.send({ data });

      } catch(error) {
        return res.status(400).json({
          message: 'Internal server error',
          error: '' + error,
        });
      }
    },

    async authUser(req, res) {
      const { email, password } = req.body;

      try {
        const data = await user.findOne({ email }).select('+password');
        if (!data) {
          return res.status(400).json({ error: 'Usuário não encontrado!' })
        }

        if (!await bcrypt.compare(password, data.password)) {
          return res.status(400).json({ error: 'Senha inválida!' });
        };

        data.password = undefined;

        const token = jwt.sign({ id: data.id }, auth.secret, {
          expiresIn: 3600
        });

        return res.send({data, token});

      } catch(error) {
        return res.status(400).json({
          message: 'Internal server error',
          error: '' + error,
        });
      };
    },
};

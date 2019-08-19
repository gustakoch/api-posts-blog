const post = require('../models/post');

module.exports = {
  async savePost(req, res) {
    try {
      const { title, url_image, description } = req.body;

      if (!title || !url_image || !description) {
          return res.json({ error: 'Preencha todos os campos do formulário!' });
      }

      const data = await post.create(req.body);
      return res.json(data);

    } catch(error) {
      res.json({
        message: 'Internal server error',
        error: '' + error
      });
    }
  },

  async getPosts(req, res) {
    try {
      const data = await post.find();
      return res.json(data);

    } catch(e) {
      res.json({
        message: 'Internal server error',
        error: ` ${e}`
      });
    }
  }
};

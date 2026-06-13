const Post = require('../models/Blog');

function BlogRepository() {

  async function list() {
    const posts = await Post.findAll({ raw: true });
    return posts;
  }

  async function find(id) {
    const post = await Post.findByPk(id);
    return post;
  }

  async function save(data) {
    // Alinhado para usar 'data' e os campos corretos do Blog (title, text, publicationDate)
    const post = {
      title: data.title,
      text: data.text, 
      publicationDate: data.publicationDate,
    }

    const post_created = await Post.create(post);
    return post_created;
  }

  async function update(id, data) {
    return await Post.update({
      title: data.title,
      text: data.text,
      publicationDate: data.publicationDate
    }, {
      where: { id: id }
    });
  }

  async function remove(id) {
    await Post.destroy({ where: { id: id } });
  }

  // Mantido caso você crie alguma funcionalidade de status no futuro, 
  // mas lembre-se que o model Blog atual não tem o campo 'done'
  async function updateStatus(id, status) {
    const post = {
      done: status,
    }

    const post_updated = await Post.update(post, { where: { id: id } });
    return post_updated;
  }

  // O return agora está corretamente DENTRO do BlogRepository()
  return {
    list,
    find,
    save,
    remove,
    update,
    updateStatus,
  }

}

module.exports = BlogRepository();
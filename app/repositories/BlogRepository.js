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

  async function save(dados) {
    const post = {
      title: dados.title,
      description: dados.description,
      done: false,
    }

    const post_created = await Post.create(post);
    return post_created;
  }

  async function update(id, dados) {
    const post = {
      title: dados.title,
      description: dados.description,
      done: dados.done === '1' ? true : false
    }

    const post_updated = await Post.update(post, { where: { id: id } });
    return post_updated;
  }

  async function remove(id) {
    await Post.destroy({ where: { id: id } });
  }

  function updateStatus(id, status) {
    const post = {
      done: status,
    }

 	  const post_updated = Post.update(post, { where: { id: id } });
    return post_updated;
  }

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

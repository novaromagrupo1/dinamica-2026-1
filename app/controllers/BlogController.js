const Post = require('../models/Blog');
const postsRepository = require("../repositories/BlogRepository");

function BlogController() {

  async function list(req, res) {
    const posts = await postsRepository.list();

    res.render('posts/list', { 
      title: "Lista de Postagens",
      posts: posts
    })
  }

  function create(req, res) {
    res.render('posts/create')
  }

  async function save(req, res) {
    await postsRepository.save(req.body);
    res.redirect('/posts');
  }

  async function remove(req, res) {
    await postsRepository.remove(req.params.id);
    res.redirect('/posts')
  }

  async function edit(req, res) {
    const post = await postsRepository.find(req.params.id);
    res.render('posts/edit', { post: post })
  }

  async function update(req, res) {
    await postsRepository.update(req.body.id, req.body);
    res.redirect('/posts');
  }

  async function updateStatus(req, res) {
    const done = req.body.done === '0' ? true : false;

    await postsRepository.updateStatus(req.params.id, done);
    res.redirect('/posts');
  }

  return {
    create,
    save,
    list,
    remove,
    edit,
    update,
    updateStatus,
  }

}

module.exports = BlogController();
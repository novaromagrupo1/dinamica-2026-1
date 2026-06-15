const userRepository = require('../repositories/UserRepository');

function UserController() {

  async function list(req, res) {
    try {
      const users = await userRepository.list();

      res.render('users/list', { 
        title: "Lista de Usuários", 
        users: users, 
      });
    } catch (error) {
      console.log(error);
    }
  }

  function create(req, res) {
    res.render('users/create');
  }

  async function save(req, res) {
    const body = req.body;
 
    if (body.password != body.confirm_password) {
      return res.render('users/create', {
        error: {
          message: 'Os campos senha e confirmar senha são diferentes.'
        }
      });
    }

    try {
      await userRepository.save(body);
      res.redirect('/users');
    } catch (error) {
      console.log(error);      
    }
  }

  async function remove(req, res) {
    try {
      await userRepository.remove(req.params.id);
      res.redirect('/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function edit(req, res) {
    try {
      const user = await userRepository.find(req.params.id);
      res.render('users/edit', { user: user });
    } catch (error) {
      console.log(error);
    }
  }

  async function update(req, res) {
    try {
      await userRepository.update(req.body.id, req.body);
      res.redirect('/users');
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(req, res) {
    try {
      const isActive = req.body.active === '0' ? true : false;
      
      await userRepository.updateStatus(req.params.id, isActive);
      res.redirect('/users');
    } catch (error) {
      console.log(error);
    }
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

module.exports = UserController();
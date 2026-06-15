const User = require('../models/User');
const bcrypt = require('bcrypt');

function UserRepository() {

  async function list() {
    return await User.findAll({ raw: true });
  }

  async function find(id) {
    return await User.findOne({ where: { id: id }, raw: true });
  }

  async function save(dados) {
    const hashed_password = await bcrypt.hash(dados.password, 10);

    const user = {
      name: dados.name,
      email: dados.email,
      password: hashed_password,
    };

    return await User.create(user);
  }

  async function update(id, dados) {
    const user = {
      name: dados.name,
      email: dados.email,
      active: dados.active === '1' ? 1 : 0
    };

    return await User.update(user, { where: { id: id } });
  }

  async function remove(id) {
    await User.destroy({ where: { id: id } });
  }

  async function updateStatus(id, status) {
    const user = {
      active: status,
    };

    return await User.update(user, { where: { id: id } });
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

module.exports = UserRepository();
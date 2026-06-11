const { DataTypes } = require('sequelize')
const { sequelize } = require('../core/sequelize');

const Blog = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
  },
  createDate: {
    type: DataTypes.DATE,
  },
  publicationDate: {
    type: DataTypes.DATE,
  }
  
})

module.exports = Blog
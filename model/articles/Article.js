const { DataTypes } = require('sequelize')
const connection = require("../../database/database")

const Article = connection.define('articles', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = Article;
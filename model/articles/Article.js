const { DataTypes } = require('sequelize')
const connection = require("../../database/database")
const Category = require("./../categories/category");

const Article = connection.define('articles', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})

Category.hasMany(Article) // Uma categoria tem muitos artigos
Article.belongsTo(Category) // Um artigo pertence a uma categoria

Article.sync({force: false}).then(() =>{})


module.exports = Article;
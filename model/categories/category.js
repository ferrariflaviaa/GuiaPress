const { DataTypes } = require('sequelize')
const connection = require("../../database/database")

const Category = connection.define('categories', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }, slug: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Category.sync({ force: false }).then(() => {})


module.exports = Category;
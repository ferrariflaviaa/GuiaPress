const { DataTypes } = require('sequelize')
const connection = require("../../database/database")

const Users = connection.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }, password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Users.sync({ force: false }).then(() => {})


module.exports = Users;
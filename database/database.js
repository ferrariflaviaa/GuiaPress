const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", 'root','123456',{
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  port: 3312,
  timezone: "-03:00"
});

module.exports = connection;
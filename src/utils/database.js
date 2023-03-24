const { Sequelize } = require("sequelize");

const db = new Sequelize({
  database: "marketplace",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root2616",
  dialect: "postgres",
  logging: false,
});

module.exports = db;

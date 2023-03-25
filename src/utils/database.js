const { Sequelize } = require("sequelize");
require('dotenv').config()

const db = new Sequelize({
  database: "marketplace",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_CONFIG_PASSWORD,
  dialect: "postgres",
  logging: false,
});

module.exports = db;

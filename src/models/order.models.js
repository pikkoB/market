const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Order = db.define('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});


module.exports = Order; 

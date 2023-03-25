const Products = require("../models/products.models");
const { Op } = require("sequelize");
const Users = require("../models/users.models");

class ProductsServices {
  static async getAll(offset, limit) {
    try {
      return await Products.findAndCountAll({
        where: { stock: { [Op.gt]: 0 }},
        offset,
        limit,
        include: Users,
      });

    } catch (error) {
      throw error;
    }
  }

  static async getOne(id) {
    try {
      return await Products.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      return await Products.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async update(newData, id) {
    try {
      return await Products.update(newData, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsServices;

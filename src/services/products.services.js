const Products = require("../models/products.models");
const { Op } = require("sequelize");
const Users = require("../models/users.models");
// const Answers = require("../models/answer.models");
// const Categories = require("../models/category.models");
// const Users = require("../models/user.models");

class ProductsServices {
  static async getAll(offset, limit) {
    
    try {
      const result = await Products.findAndCountAll({
        where: { stock: 
          {
            [Op.gt]: 0
          }},
        // attributes: {
        //   exclude: ["description", "author", "categoryId", "craetedAt"],
        // },
        include: Users,
        offset,
        limit,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      const result = await Products.create(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(newData, id) {
    try {
      const result = await Products.update(newData, {
        where: { id },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsServices;

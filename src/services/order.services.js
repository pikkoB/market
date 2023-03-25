const Order = require("../models/order.models");
const ProductInOrder = require("../models/productInOrder.models");

class OrderServices {
    static async create(data) {
        try {
            return await Order.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async addproduct(data) {
        try {
            return await ProductInOrder.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async getOrderByUser(user_id) {
        try {
            return await Order.findOne({
                where: {user_id},
                include: ProductInOrder
            })
        } catch (error) {
            throw error;
        }
    }

}
module.exports = OrderServices;
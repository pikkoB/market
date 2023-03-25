const Cart = require("../models/cart.models");
const ProductInCart = require("../models/productInCart.models");

class CartServices {
    static async add(data) {
        try {
            return await Cart.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async getByUser(user_id) {
        try {
            return await Cart.findOne({ where: {user_id}})
        } catch (error) {
            throw error;
        }
    }

    static async getProductInCart(cart_id, product_id) {
        return await ProductInCart.findOne({ 
            where: {
                cart_id,
                product_id,
            }
        })
    }

    static async addProduct(data) {
        try {
            return await ProductInCart.create(data)
        } catch (error) {
            throw error;
        }
    }

    static async updateCart(id, total) {
        try {
            return await Cart.update(total, {
                where: {id}
            })
        } catch (error) {
            throw error;
        }
    }

    static async updateProductInCart(data) {
        try {
            return ProductInCart.update(data)
        } catch (error) {
            throw error;
        }
    }

    static async getCartByUser(user_id) {
        try {
            return await Cart.findOne({
                where: {user_id},
                include: ProductInCart
            })
        } catch (error) {
            throw error;
        }
    }
}
module.exports = CartServices;
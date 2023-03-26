const { response } = require("express");
const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");
const ProductsServices = require("../services/products.services");

const createOrder = async (req, res, next) => {
    //necesito verificar la autenticacion.. token y user por params
    //consulto la informacion de cart y productos
    //verificar stock y armar nuevas cantidades, sub_total, total de la orden
    //creo la orden en tabla orden
    //crear listado de productos por order

    const { id } = req.user;
    const { user } = req.params;
    
    if (id != user) {
        return next({
            status: 401,
            message: "user not logged in",
            errorName: "Unauthorized",
        });
    }

    try {
        const result = await CartServices.getCartByUser(user)
        
        let products = result.product_in_carts;
        let totalTemp = 0
        let toFilter = []

        products?.forEach( async (product) => {
            const { stock, price } = await ProductsServices.getOne(product.product_id)
           
                if (stock < product.quantity) {
                    const newProduct = {
                        product_id: product.product_id,
                        quantity: stock,
                        sub_total: stock * price
                    }
                    toFilter.push(newProduct)
                    totalTemp = totalTemp + (stock * price)
                } else {
                    toFilter.push(product);
                    totalTemp += product.sub_total;
                }
        });

        let productsToOrder = []
        setTimeout(async () => {
            productsToOrder = toFilter.filter(item => item.quantity > 0 )
            const order = await OrderServices.create({
                total: totalTemp,
                user_id: user
            })
            productsToOrder?.forEach(async ({product_id, quantity, sub_total}) => {
                const newProduct = {
                    product_id,
                    quantity,
                    sub_total,
                    order_id: order.id
                }
                await OrderServices.addProduct(newProduct)
            })

            await CartServices.deleteCart(user)
            res.status(201).json({
                success: true,
            });
        }, 500)


    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    const { id: user_id } = req.user;
    try {
        const result = await OrderServices.getOrderByUser(user_id)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createOrder,
    getOrder,
}
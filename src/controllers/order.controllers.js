const CartServices = require("../services/cart.services");
const OrderServices = require("../services/order.services");

const createOrder = async (req, res, next) => {
    //necesito verificar la autenticacion.. token y user por params
    //consulto la informacion de cart y productos
    //verificar stock y armar nuevas cantidades, sub_total, total de la orden
    //creo la orden en tabla orden
    //crear listado de productos por order

    const { id } = req.user;
    const { user } = req.param;
    if (id != user) {
        return next({
            status: 401,
            message: "Unauthorized",
            errorName: "user not logged in",
        });
    }

    try {
        const result = await CartServices.getCartByUser(user)

        let products = result.products_in_cart;
        let totalTemp = 0
        let toFilter = []
        products.forEach( async (product) => {
            const { stock, price } = await ProductsServices.getOne(product.product_id)
            if (stock < product.quantity) {
                const newProduct = {
                    product_id: product.product_id,
                    quantity: stock,
                    sub_total: stock * price
                }
                toFilter.push(newProduct)
                totalTemp = totalTemp + (stock * price)
            }
            toFilter.push(product);
            totalTemp += product.sub_total;
        });

        const productsToOrder = toFilter.filter(item => item.quantity > 0 )

        const {id} = await OrderServices.create({
            total: totalTemp,
            user_id: user
        })
        
        productsToOrder.forEach( async (product) => {
            product.order_id = id
            await OrderServices.addProduct(product)
        })

        res.status(201).json({
            success: true
        });

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
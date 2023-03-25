const CartServices = require("../services/cart.services");
const ProductsServices = require("../services/products.services");



const addToCart = async (req, res, next) => {
    try {
        const { user_id } = req.user
        const { product_id, quantity, sub_total } = req.body;
        const data = {
            user_id,
            total: sub_total
        }

        const addNewProduct = async (id) => {
            await CartServices.addProduct({
                cart_id: id,
                product_id,
                quantity,
                sub_total
            })
            return res.status(201).json({
                success: true
            });
        }

        const { stock } = await ProductsServices.getOne(product_id)

        const stockVerify = (stock, quantityToAdd) => {
            if (stock < quantityToAdd) {
                return next({
                    status: 406,
                    message: "Not acceptable",
                    errorName: "stock no disponible",
                });
            }
        }

        // comprobamos si existe el carrito        
        const cart = await CartServices.getByUser(user_id)

        // si no existe se crea...
        if (!cart) {
            const {id} = await CartServices.add(data)

            //comprobamos stock
            // if (stock < quantity) {
            //     return next({
            //         status: 406,
            //         message: "Not acceptable",
            //         errorName: "stock no disponible",
            //     });
            // }
            const quantityToAdd = quantity
            stockVerify(stock, quantityToAdd)

            // si estock suficiente, se crea el cart
            addNewProduct(id)
        }

        // si cart existe, actualizamos
        const { id, total } = cart
        await CartServices.updateCart(id, { total: total += sub_total })

        // luego de actualizar, comprobamos si existe el producto in cart
        const findProduct = await CartServices.getProductInCart(cart_id = id, product_id)
        
        // si no exist, se crea
        if (!findProduct) {
            // await CartServices.addProduct({
            //     cart_id: id,
            //     product_id,
            //     quantity,
            //     sub_total
            // })
            addNewProduct(id)
        }

        // si existe, extraemos las propiedades a actualizar
        const { quantity: addQuantity, sub_total: addSubTotal } = findProduct

        //verificamos stock con cantidades a adherir
        const quantityToAdd = quantity + addQuantity
        stockVerify(stock, quantityToAdd)

        await CartServices.updateProductInCart({
            quantity: addQuantity + quantity,
            sub_total: addSubTotal + sub_total
        })

        res.status(201).json({
            success: true
        });
    } catch (error) {
        next(error)
    }
}

const getCart = async (req, res, next) => {
    const { id: user_id } = req.user;
    try {
        const result = await CartServices.getCartByUser(user_id)
        res.json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addToCart,
    getCart
}
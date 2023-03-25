const CartServices = require("../services/cart.services")



const addToCart = async (req, res, next) => {
    try {
        const {user_id} = req.user
        const {product_id, quantity, sub_total} = req.body;
        const data = {
            user_id,
            total: sub_total
        }

        // comprobamos si existe el carrito        
        const cart = await CartServices.getByUser(user_id)
        if (!cart) {
            const result = await CartServices.add(data)
            const {id} = result
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

        // si cart existe, actualizamos
        const {id, total} = cart
        await CartServices.updateCart(id, {total: total += sub_total})

        // luego de actualizar, comprobamos si existe el producto in cart
        const findProduct = await CartServices.getProductInCart(cart_id = id, product_id)
        if (!findProduct) {
            await CartServices.addProduct({
                cart_id: id,
                product_id,
                quantity,
                sub_total
            })
        }

        // si existe, extraemos las propiedades a actualizar
        const {quantity : addQuantity, sub_total : addSubTotal} = findProduct
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
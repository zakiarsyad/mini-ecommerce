
const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
    static getCart(req, res, next) {
        const { userId } = req.decode
    
        Cart.findOne({ userId, status: 'unpaid' }).populate('items.productId')
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static createCart(req, res, next) {
        const { userId } = req.decode

        Cart.findOne({ userId, status: 'unpaid' })
            .then(cart => {
                if (cart) res.status(200).json(cart)
                else {
                    Cart.create({ userId })
                        .then(cart => {
                            res.status(201).json(cart)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    static addProduct(req, res, next) {
        const { userId } = req.decode
        const productId = req.params.id
        const { qty } = req.body
        let productInCart = {}

        Product.findById(productId)
            .then(product => {
                if (product) {
                    productInCart = product

                    Cart.findOne({ userId, status: 'unpaid' })
                        .then(cart => {

                            cart.items.push({
                                productId: productInCart._id,
                                qty
                            })
                            
                            cart.save()
                                .then(cart => {
                                    res.status(200).json(cart)
                                })
                                .catch(next)
                        })
                        .catch(next)
                } else next({
                    status: 404,
                    message: `Product id is invalid!`
                })
            })
            .catch(next)
    }

    static updateQty(req, res, next) {
        const { userId } = req.decode
        const productId = req.params.id
        const { qty } = req.body

        Cart.findOne({ userId, status: 'unpaid' })
            .then(cart => {
                cart.items.forEach((el, index) => {
                    if (el.productId == productId) {
                        el.qty = qty
                    }
                })
                cart.save()
                    .then(cart => {
                        res.status(200).json(cart)
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        const { userId } = req.decode
        const cartProductId = req.params.id
        let deletedProduct = ''

        Cart.findOne({ userId, status: 'unpaid' }).populate('items.productId')
            .then(cart => {
                cart.items.forEach((el, index) => {
                    if (el._id == cartProductId) {
                        deletedProduct = el.productId.name
                        cart.items.splice(index, 1)
                    }
                })
                cart.save()
                    .then(cart => {
                        res.status(200).json({ deletedProduct })
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = CartController
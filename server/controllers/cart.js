
const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {
    static getUnpaidCart(req, res, next) {
        const { userId } = req.decode
    
        Cart.findOne({ userId, status: 'unpaid' }).populate('items.productId').sort({updatedAt: -1})
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static getUserCart(req, res, next) {
        const { userId } = req.decode

        Cart.find({ userId }).populate('items.productId').sort({updatedAt: -1})
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static getAllCart(req, res, next) {
        Cart.find().populate('items.productId').populate('userId').sort({updatedAt: -1})
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
                else return Cart.create({ userId })
            })
            .then(cart => {
                res.status(201).json(cart)
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
                if (!product) {
                    next({
                        status: 404,
                        message: `Product id is invalid!`
                    })
                } else {
                    productInCart = product

                    return Cart.findOne({ userId, status: 'unpaid' })
                }
            })
            .then(cart => {
                cart.items.push({
                    productId: productInCart._id,
                    qty
                })

                cart.save()
            })
            .then(cart => {
                res.status(200).json(cart)
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
                
                return cart.save()
            })
            .then(cart => {
                res.status(200).json(cart)
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

                return cart.save()
            })
            .then(cart => {
                res.status(200).json({ deletedProduct })
            })
            .catch(next)
    }

    static updateStatus(req, res, next) {
        const { status } = req.body
        const { id } = req.params

        Cart.findById(id).populate('items.productId')
            .then(cart => {
                cart.status = status
                return cart.save()
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params

        Cart.findById(id).populate('items.productId')
            .then(cart => {
                return cart.delete()
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }
}

module.exports = CartController
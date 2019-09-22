
const { verifyToken } = require('../helpers/jwt')
const Product = require('../models/product')
const Cart = require('../models/cart')

function authentication(req, res, next) {
    const { token } = req.headers

    try {
        req.decode = verifyToken(token)
        next()
    } catch (err) { next({ status: 403, message: `Please login first` }) }
}

function authorization(req, res, next) {
    const productId = req.params.id
    const userId = req.decode.userId

    Product.findOne({ _id: productId })
        .then(product => {
            if (product) {
                if (product.userId == userId) next()
                else next({ status: 401, message: `You are not authorized` })
            } else next({ status: 404, message: `product id is invalid` })
        })
        .catch(next)
}

function adminAuthorization(req, res, next) {
    if (req.decode.role === 'admin') next()
    else next({ status: 401, message: `You are not authorized` })
}

function cartAuthorization(req, res, next) {
    const cartId = req.params.id
    const userId = req.decode.userId

    Cart.findOne({ _id: cartId })
        .then(cart => {
            if (cart) {
                if (cart.userId == userId) next()
                else next({ status: 401, message: `You are not authorized` })
            } else next({ status: 404, message: `cart id is invalid` })
        })
        .catch(next)
}

module.exports = { authentication, authorization, adminAuthorization, cartAuthorization }
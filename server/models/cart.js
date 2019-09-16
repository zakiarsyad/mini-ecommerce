
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number
    }],
    status: {
        type: String,
        default: 'unpaid'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)
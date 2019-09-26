
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    description: {
        type: String,
        required: [true, 'product description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
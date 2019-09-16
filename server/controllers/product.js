
const Product = require('../models/product')
const { Storage } = require('@google-cloud/storage')

class ProductController {
    static getProducts(req, res, next) {
        Product.find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static addProduct(req, res, next) {
        const { productName, price, category, stock } = req.body
        const { userId } = req.decode
        const image = req.file.cloudStoragePublicUrl
        
        Product.create({ productName, price, category, stock, userId, image })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static getProduct(req, res, next) {
        const { id } = req.params

        Product.findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)
    }

    static editProduct(req, res, next) {
        const { id } = req.params
        const { productName, price, category, stock } = req.body

        Product.findById(id)
            .then(product => {
                if ( productName )product.productName = productName
                if ( price ) product.price = price
                if ( category ) product.category = category
                if (stock) product.stock = stock
                if (req.file) {
                    const CLOUD_BUCKET = process.env.CLOUD_BUCKET
                    
                    const storage = new Storage({
                        projectId: process.env.GCLOUD_PROJECT,
                        keyFilename: process.env.KEYFILE_PATH
                    })
                    
                    let deleteFile = product.image
                    product.image = req.file.cloudStoragePublicUrl

                    let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/storage-ecommerce.zakiarsyad.com\/)/, '')

                    storage
                        .bucket(CLOUD_BUCKET)
                        .file(filename)
                        .delete()
                }
                product.save()
                    .then(product => {
                        res.status(200).json(product)
                    })
                    .catch(next)
            })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params

        Product.findById(id)
            .then(product => {
                const CLOUD_BUCKET = process.env.CLOUD_BUCKET

                const storage = new Storage({
                    projectId: process.env.GCLOUD_PROJECT,
                    keyFilename: process.env.KEYFILE_PATH
                })

                let deleteFile = product.image

                let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/storage-ecommerce.zakiarsyad.com\/)/, '')

                storage
                    .bucket(CLOUD_BUCKET)
                    .file(filename)
                    .delete()
                
                product.delete()
                    .then(product => {
                        res.status(200).json(product)
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = ProductController
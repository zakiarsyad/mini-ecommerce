
const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, authorization } = require('../middlewares/auth')
const gcs = require('../helpers/gcs')

router.get('/', ProductController.getProducts)

router.use(authentication)
router.post('/', gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.addProduct)
router.get('/:id', ProductController.getProduct)

router.patch('/:id', authorization, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.editProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router
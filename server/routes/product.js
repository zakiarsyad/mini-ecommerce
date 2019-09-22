
const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authentication, adminAuthorization } = require('../middlewares/auth')
const gcs = require('../helpers/gcs')

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)

router.use(authentication)
router.post('/', adminAuthorization, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.addProduct)
router.patch('/:id', adminAuthorization, gcs.multer.single('image'), gcs.sendUploadToGCS, ProductController.editProduct)
router.delete('/:id', adminAuthorization, ProductController.deleteProduct)

module.exports = router
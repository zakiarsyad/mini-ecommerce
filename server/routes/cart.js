
const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication, cartAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.getCart)
router.post('/', CartController.createCart)

// router.use('/product/:id' ,cartAuthorization)
router.post('/product/:id', CartController.addProduct)
router.patch('/product/:id', CartController.updateQty)
router.delete('/product/:id', CartController.deleteProduct)

module.exports = router
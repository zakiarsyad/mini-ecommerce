
const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authentication, cartAuthorization, adminAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.get('/', adminAuthorization, CartController.getAllCart)
router.get('/user', CartController.getUserCart)
router.get('/unpaid', CartController.getUnpaidCart)
router.post('/', CartController.createCart)
router.patch('/:id', cartAuthorization, CartController.updateStatus)
router.delete('/:id', cartAuthorization, CartController.delete)

// router.use('/product/:id' ,cartAuthorization)
router.post('/product/:id', CartController.addProduct)
router.patch('/product/:id', CartController.updateQty)
router.delete('/product/:id', CartController.deleteProduct)

module.exports = router
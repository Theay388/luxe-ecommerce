const router = require('express').Router()
const c = require('../controllers/cartController')
const { protect } = require('../middleware/auth')
router.get('/', protect, c.getCart)
router.post('/', protect, c.addToCart)
router.put('/:itemId', protect, c.updateCartItem)
router.delete('/clear', protect, c.clearCart)
router.delete('/:itemId', protect, c.removeCartItem)
module.exports = router

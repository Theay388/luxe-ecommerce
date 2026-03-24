const Cart = require('../models/Cart')

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock')
    res.json(cart || { user: req.user._id, items: [] })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.addToCart = async (req, res) => {
  try {
    const { product, name, image, price, size, color, qty = 1 } = req.body
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = new Cart({ user: req.user._id, items: [] })
    const idx = cart.items.findIndex(i => i.product.toString() === product && i.size === size && i.color === color)
    if (idx > -1) cart.items[idx].qty = qty
    else cart.items.push({ product, name, image, price, size, color, qty })
    await cart.save()
    res.json(cart)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.updateCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    item.qty = req.body.qty
    await cart.save()
    res.json(cart)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId)
    await cart.save()
    res.json(cart)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
    res.json({ message: 'Cart cleared' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

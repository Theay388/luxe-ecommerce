const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const User = require('../models/User')

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body
    const order = await new Order({ user: req.user._id, items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice }).save()
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })
    res.status(201).json(order)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getMyOrders = async (req, res) => {
  try { res.json(await Order.find({ user: req.user._id }).sort('-createdAt')) }
  catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' })
    res.json(order)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getAllOrders = async (req, res) => {
  try { res.json(await Order.find().populate('user', 'name email').sort('-createdAt')) }
  catch (err) { res.status(500).json({ message: err.message }) }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getDashboardStats = async (req, res) => {
  try {
    const [orders, recentOrders, products, users] = await Promise.all([
      Order.find(),
      Order.find().sort('-createdAt').limit(5).populate('user', 'name'),
      Product.countDocuments(),
      User.countDocuments()
    ])
    const revenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0)
    res.json({ revenue, orders: orders.length, products, users, recentOrders })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

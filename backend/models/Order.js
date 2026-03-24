const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String, image: String, price: Number, size: String, color: String, qty: Number
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    fullName: String, street: String, city: String,
    state: String, country: String, postalCode: String, phone: String
  },
  paymentMethod: { type: String, default: 'card' },
  itemsPrice: Number, shippingPrice: Number, taxPrice: Number, totalPrice: Number,
  status: { type: String, enum: ['Pending','Processing','Shipped','Delivered','Cancelled'], default: 'Pending' },
  isPaid: { type: Boolean, default: true },
  paidAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)

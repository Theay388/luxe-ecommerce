const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort, size, color, minPrice, maxPrice, page = 1, limit = 12 } = req.query
    const query = {}
    if (category) query.category = category
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ]
    if (size) query.sizes = size
    if (color) query.colors = color
    if (minPrice || maxPrice) query.price = {}
    if (minPrice) query.price.$gte = Number(minPrice)
    if (maxPrice) query.price.$lte = Number(maxPrice)

    const sortMap = { newest: '-createdAt', price_asc: 'price', price_desc: '-price', rating: '-rating' }
    const sortBy = sortMap[sort] || '-createdAt'
    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
      Product.find(query).sort(sortBy).skip(skip).limit(Number(limit)),
      Product.countDocuments(query)
    ])
    res.json({ products, page: Number(page), pages: Math.ceil(total / Number(limit)), total })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getFeatured = async (req, res) => {
  try { res.json(await Product.find({ isFeatured: true }).limit(8)) }
  catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getNewArrivals = async (req, res) => {
  try { res.json(await Product.find({ isNewArrival: true }).sort('-createdAt').limit(8)) }
  catch (err) { res.status(500).json({ message: err.message }) }
}

exports.createProduct = async (req, res) => {
  try {
    const product = await new Product(req.body).save()
    res.status(201).json(product)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product removed' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    const already = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (already) return res.status(400).json({ message: 'You already reviewed this product' })
    product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment })
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    await product.save()
    res.status(201).json({ message: 'Review added' })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already in use' })
    const user = await new User({ name, email, password }).save()
    const token = signToken(user._id)
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid email or password' })
    const token = signToken(user._id)
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token })
  } catch (err) { res.status(500).json({ message: err.message }) }
}

exports.getMe = async (req, res) => {
  try { res.json(req.user) } catch (err) { res.status(500).json({ message: err.message }) }
}

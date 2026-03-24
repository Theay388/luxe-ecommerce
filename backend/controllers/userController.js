const User = require('../models/User');

// @desc  Get user profile
// @route GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist', 'name price images category');
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc  Update user profile
// @route PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = password;
    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, phone: updated.phone, role: updated.role });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// @desc  Add address
// @route POST /api/users/address
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) user.addresses.forEach(a => a.isDefault = false);
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// @desc  Update address
// @route PUT /api/users/address/:addressId
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    if (req.body.isDefault) user.addresses.forEach(a => a.isDefault = false);
    Object.assign(address, req.body);
    await user.save();
    res.json(user.addresses);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// @desc  Delete address
// @route DELETE /api/users/address/:addressId
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addressId);
    await user.save();
    res.json(user.addresses);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc  Toggle wishlist item
// @route POST /api/users/wishlist/:productId
const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const idx = user.wishlist.indexOf(req.params.productId);
    if (idx === -1) user.wishlist.push(req.params.productId);
    else user.wishlist.splice(idx, 1);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc  Get all users (admin)
// @route GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc  Delete user (admin)
// @route DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getProfile, updateProfile, addAddress, updateAddress, deleteAddress, toggleWishlist, getAllUsers, deleteUser };

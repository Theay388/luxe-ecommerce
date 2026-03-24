require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

connectDB()

const app = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://luxe-backend-3ctc.onrender.com',      // Render backend
    /^https:\/\/.*\.vercel\.app$/,                  // Any Vercel deployment URL
  ],
  credentials: true
}))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.json({ message: 'LUXE API Running' }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/users', require('./routes/users'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/orders', require('./routes/orders'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

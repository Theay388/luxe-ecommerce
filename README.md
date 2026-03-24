# LUXE — Premium Clothing & Accessories

> A full-stack e-commerce platform for a luxury fashion brand, featuring a dark editorial aesthetic, complete user authentication, product management, and order tracking.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

### Customer-Facing
- 🛍️ **Browse & Shop** — Filter by category (Women / Men / Accessories), size, color, price range, and sort by newest, price, or rating
- 🔍 **Search** — Full-text product search from the navbar
- 📦 **Product Pages** — Image gallery, size/color selectors, reviews with ratings
- 🛒 **Shopping Cart** — Add, update quantity, remove items (persisted in localStorage)
- 💳 **Checkout** — Multi-step flow: Shipping → Review → Payment → Confirmation
- ❤️ **Wishlist** — Save favourite products (requires login)
- 👤 **User Profile** — Edit personal info, manage saved addresses, change password, view order history
- 📋 **Order Tracking** — Full order detail with status badge

### Admin Panel (`/admin`)
- 📊 **Dashboard** — Revenue, orders, products, users KPIs + recent orders
- 📦 **Product CRUD** — Create, edit, delete products with image URL, stock, and variant management
- 📋 **Order Management** — View all orders, update statuses (Pending → Shipped → Delivered)
- 👥 **User Management** — View all users, delete accounts

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | SPA with fast HMR development |
| **Routing** | React Router v6 | Client-side navigation |
| **State** | Context API + useReducer | Auth, cart, toast notifications |
| **HTTP Client** | Axios | API calls with JWT interceptor |
| **Backend** | Node.js + Express 4 | REST API server |
| **Database** | MongoDB + Mongoose | Document-based data storage |
| **Auth** | JWT + bcryptjs | Stateless authentication, password hashing |
| **Fonts** | Playfair Display + Inter | Editorial luxury typography |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB (local) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/luxe-ecommerce.git
cd luxe-ecommerce
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/luxe_ecommerce
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

Seed the database with sample products and an admin user:
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
# Server running at http://localhost:5000
```

### 3. Set up the Frontend
```bash
cd ../frontend
npm install
npx vite --port 5173
# App running at http://localhost:5173
```

### 4. Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@luxe.com` | `admin123` |
| User | `sarah@example.com` | `user1234` |

---

## 📁 Project Structure

```
web_pc/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Register, login, getMe
│   │   ├── cartController.js  # Cart CRUD
│   │   ├── orderController.js # Order management + admin stats
│   │   ├── productController.js # Product CRUD, search, reviews
│   │   └── userController.js  # Profile, addresses, wishlist
│   ├── middleware/
│   │   ├── auth.js            # JWT protect + admin guards
│   │   └── errorHandler.js    # Global error handler
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── .env                   # ⚠️ Not committed to Git
│   ├── seed.js                # Database seeder
│   └── server.js              # Express entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AdminRoute.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx  # Auth state + localStorage
    │   │   ├── CartContext.jsx  # Cart state + localStorage
    │   │   └── ToastContext.jsx # Toast notifications
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Orders.jsx
    │   │   │   ├── Products.jsx
    │   │   │   └── Users.jsx
    │   │   ├── Auth.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Home.jsx
    │   │   ├── OrderDetail.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Shop.jsx
    │   │   └── Wishlist.jsx
    │   ├── services/
    │   │   └── api.js          # Axios instance with JWT interceptor
    │   ├── App.jsx             # Router + provider tree
    │   ├── index.css           # Design system (CSS variables + components)
    │   └── main.jsx            # React entry point
    ├── index.html
    └── vite.config.js          # Vite config with API proxy
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Create account → returns JWT |
| `POST` | `/api/auth/login` | Public | Login → returns JWT |
| `GET` | `/api/auth/me` | Protected | Get current user |

### Products
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| `GET` | `/api/products` | Public | List products (with `?category`, `?search`, `?sort`, `?size`, `?color`, `?page`) |
| `GET` | `/api/products/featured` | Public | Featured products |
| `GET` | `/api/products/new-arrivals` | Public | New arrival products |
| `GET` | `/api/products/:id` | Public | Single product |
| `POST` | `/api/products` | Admin | Create product |
| `PUT` | `/api/products/:id` | Admin | Update product |
| `DELETE` | `/api/products/:id` | Admin | Delete product |
| `POST` | `/api/products/:id/reviews` | Protected | Add review |

### Users
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| `GET` | `/api/users/profile` | Protected | Get profile (incl. wishlist) |
| `PUT` | `/api/users/profile` | Protected | Update name/email/phone/password |
| `POST` | `/api/users/address` | Protected | Add shipping address |
| `PUT` | `/api/users/address/:id` | Protected | Update address |
| `DELETE` | `/api/users/address/:id` | Protected | Delete address |
| `POST` | `/api/users/wishlist/:productId` | Protected | Toggle wishlist item |
| `GET` | `/api/users` | Admin | List all users |
| `DELETE` | `/api/users/:id` | Admin | Delete user |

### Cart
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| `GET` | `/api/cart` | Protected | Get cart |
| `POST` | `/api/cart` | Protected | Add / update item |
| `PUT` | `/api/cart/:itemId` | Protected | Update item quantity |
| `DELETE` | `/api/cart/:itemId` | Protected | Remove item |
| `DELETE` | `/api/cart/clear` | Protected | Clear cart |

### Orders
| Method | Endpoint | Access | Description |
|--------|---------|--------|-------------|
| `POST` | `/api/orders` | Protected | Place order (clears cart) |
| `GET` | `/api/orders/mine` | Protected | My orders |
| `GET` | `/api/orders/:id` | Protected | Order detail |
| `GET` | `/api/orders` | Admin | All orders |
| `PUT` | `/api/orders/:id/status` | Admin | Update order status |
| `GET` | `/api/orders/stats` | Admin | Dashboard stats |

---

## 🎨 Design System

The UI follows an **"Atelier Noir"** editorial aesthetic inspired by Dior and COS:

| Token | Value |
|-------|-------|
| Primary background | `#131313` deep charcoal |
| Text | `#e5e2e1` warm ivory |
| Accent | `#c9a96e` muted gold |
| Heading font | Playfair Display (serif) |
| Body font | Inter |
| Border radius | `0px` — sharp edges throughout |
| Borders | None — tonal background shifts used instead |

---

## ☁️ Free Hosting

| Service | Platform | Free Tier |
|---------|---------|-----------|
| Frontend | [Vercel](https://vercel.com) | ✅ Unlimited |
| Backend | [Render](https://render.com) | ✅ (sleeps after 15 min) |
| Database | [MongoDB Atlas](https://mongodb.com/cloud/atlas) | ✅ 512MB M0 cluster |

See [`guide.md`](./guide.md) for step-by-step deployment instructions.

---

## 📄 License

MIT — feel free to use this project for educational purposes.

---

*Built with ❤️ as a university e-commerce project.*

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiHeart, FiShoppingBag, FiUser } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
  const { cartCount } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setSearchOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">LUXE</Link>
        <div className="navbar__links">
          <Link to="/shop?category=Women" className="navbar__link">Women</Link>
          <Link to="/shop?category=Men" className="navbar__link">Men</Link>
          <Link to="/shop?category=Accessories" className="navbar__link">Accessories</Link>
          <Link to="/shop?sale=true" className="navbar__link text-gold">Sale</Link>
        </div>
        <div className="navbar__actions">
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                className="form-input"
                style={{ width: '200px', background: 'transparent', color: 'var(--color-text)', padding: '4px 0', fontSize: '0.85rem' }}
                autoFocus value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                onBlur={() => !search && setSearchOpen(false)}
              />
            </form>
          ) : (
            <FiSearch className="navbar__icon" onClick={() => setSearchOpen(true)} title="Search" style={{ cursor: 'pointer' }} />
          )}
          <Link to="/wishlist" title="Wishlist">
            <FiHeart className="navbar__icon" />
          </Link>
          <Link to="/cart" style={{ position: 'relative' }} title="Cart">
            <FiShoppingBag className="navbar__icon" />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </Link>
          <Link to={user ? '/profile' : '/auth'} title={user ? 'Profile' : 'Sign In'}>
            <FiUser className="navbar__icon" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import api from '../services/api'

const fmt = (n) => `£${Number(n).toFixed(2)}`

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToast } = useToast()

  const handleWishlist = async (e) => {
    e.stopPropagation()
    if (!user) { navigate('/auth'); return }
    try {
      await api.post(`/users/wishlist/${product._id}`)
      addToast('Wishlist updated')
    } catch { addToast('Error updating wishlist', 'error') }
  }

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-card__img-wrap">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600'}
          alt={product.name}
          loading="lazy"
        />
        <button className="product-card__wishlist" onClick={handleWishlist} title="Add to Wishlist">
          <FiHeart />
        </button>
      </div>
      <div className="product-card__info">
        <div className="product-card__tag">{product.subcategory || product.category}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__price">
          <span className={product.comparePrice > 0 ? 'product-card__price--sale' : ''}>{fmt(product.price)}</span>
          {product.comparePrice > 0 && <span className="product-card__price--compare">{fmt(product.comparePrice)}</span>}
        </div>
      </div>
    </div>
  )
}

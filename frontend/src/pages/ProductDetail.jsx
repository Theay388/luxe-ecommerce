import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ProductCard from '../components/ProductCard'

const fmt = n => `£${Number(n).toFixed(2)}`

function Stars({ rating }) {
  return <div className="stars">{[1,2,3,4,5].map(s => <span key={s}>{s <= Math.round(rating) ? '★' : '☆'}</span>)}</div>
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="accordion__item">
      <div className="accordion__toggle" onClick={() => setOpen(!open)}>
        <span className="accordion__title">{title}</span>
        <span className={`accordion__icon ${open ? 'open' : ''}`}>+</span>
      </div>
      {open && <div className="accordion__body">{children}</div>}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { addToast } = useToast()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [selImg, setSelImg] = useState(0)
  const [selSize, setSelSize] = useState('')
  const [selColor, setSelColor] = useState('')
  const [qty, setQty] = useState(1)
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/products/${id}`).then(({ data }) => {
      setProduct(data)
      if (data.sizes?.length) setSelSize(data.sizes[0])
      if (data.colors?.length) setSelColor(data.colors[0])
      return api.get(`/products?category=${data.category}&limit=4`)
    }).then(({ data }) => {
      setRelated(data.products?.filter(p => p._id !== id) || [])
    }).finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (!selSize) return addToast('Please select a size', 'error')
    addToCart({ product: product._id, name: product.name, image: product.images?.[0], price: product.price, size: selSize, color: selColor, qty })
    addToast(`${product.name} added to cart`)
  }

  const handleWishlist = async () => {
    if (!user) return navigate('/auth')
    await api.post(`/users/wishlist/${product._id}`)
    addToast('Wishlist updated')
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/auth')
    setSubmitting(true)
    try {
      await api.post(`/products/${id}/reviews`, review)
      addToast('Review submitted!')
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
    finally { setSubmitting(false) }
  }

  if (loading) return <div className="spinner-wrap" style={{ minHeight: '60vh' }}><div className="spinner" /></div>
  if (!product) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Product not found.</div>

  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-10) var(--space-8)' }}>
        <p className="breadcrumb">
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span> /&nbsp;
          <span onClick={() => navigate(`/shop?category=${product.category}`)} style={{ cursor: 'pointer' }}>{product.category}</span> /&nbsp;
          <span>{product.name}</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-12)', marginTop: 'var(--space-8)' }}>
          {/* Gallery */}
          <div>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--color-bg-low)', marginBottom: 'var(--space-3)' }}>
              <img src={product.images?.[selImg] || product.images?.[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {product.images?.map((img, i) => (
                <div key={i} onClick={() => setSelImg(i)} style={{ width: '72px', height: '90px', overflow: 'hidden', cursor: 'pointer', border: i === selImg ? '1px solid var(--color-gold-lt)' : '1px solid transparent', opacity: i === selImg ? 1 : 0.6 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
          {/* Info */}
          <div style={{ padding: 'var(--space-4) 0' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: 'var(--space-3)' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Stars rating={product.rating} />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>({product.numReviews} reviews)</span>
            </div>
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: product.comparePrice > 0 ? 'var(--color-gold-lt)' : 'var(--color-text)' }}>{fmt(product.price)}</span>
              {product.comparePrice > 0 && <span style={{ marginLeft: 'var(--space-3)', textDecoration: 'line-through', color: 'var(--color-muted)', fontSize: '1rem' }}>{fmt(product.comparePrice)}</span>}
            </div>
            <hr className="divider divider-gold" />
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Color — <span style={{ color: 'var(--color-text)' }}>{selColor}</span></p>
                <div className="color-swatches">
                  {product.colors.map(c => <div key={c} className={`color-swatch ${selColor === c ? 'selected' : ''}`} title={c}
                    style={{ background: c.toLowerCase() === 'ivory' ? '#f5f0eb' : c.toLowerCase() === 'camel' ? '#c9a96e' : c.toLowerCase() === 'charcoal' ? '#4a4a4a' : c.toLowerCase() }}
                    onClick={() => setSelColor(c)} />)}
                </div>
              </div>
            )}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Size — <span style={{ color: 'var(--color-text)' }}>{selSize}</span></p>
                <div className="size-chips">
                  {product.sizes.map(s => <div key={s} className={`size-chip ${selSize === s ? 'selected' : ''}`} onClick={() => setSelSize(s)}>{s}</div>)}
                </div>
              </div>
            )}
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Quantity</p>
              <div className="qty-stepper">
                <button className="qty-stepper__btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-stepper__val">{qty}</span>
                <button className="qty-stepper__btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              <button className="btn btn-primary btn-full" onClick={handleAddToCart} disabled={product.stock === 0}>
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="btn btn-secondary btn-full" onClick={handleWishlist}>
                <FiHeart /> Add to Wishlist
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--color-muted)' }}>✦ Complimentary shipping on orders over £200</p>
            <hr className="divider" />
            <Accordion title="Product Details" defaultOpen={true}>
              <p>{product.description}</p>
              <p style={{ marginTop: 'var(--space-3)' }}>Category: {product.category} · {product.subcategory}</p>
              <p>Stock: {product.stock} available</p>
            </Accordion>
            <Accordion title="Care Instructions">
              <p>Dry clean recommended. For cashmere, hand wash cold. Lay flat to dry. Store in a breathable garment bag.</p>
            </Accordion>
            <Accordion title="Delivery & Returns">
              <p>Complimentary standard shipping on orders over £200. Returns accepted within 30 days in original condition.</p>
            </Accordion>
          </div>
        </div>

        {/* Reviews */}
        <section className="section">
          <h2 className="section-title" style={{ marginBottom: 'var(--space-8)' }}>Customer Reviews</h2>
          {product.reviews?.length === 0 && <p style={{ color: 'var(--color-muted)' }}>No reviews yet. Be the first to share your experience.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            {product.reviews?.map(r => (
              <div key={r._id} style={{ background: 'var(--color-bg-low)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 500 }}>{r.name}</span>
                  <Stars rating={r.rating} />
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>{r.comment}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-8)', maxWidth: '500px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-6)' }}>Write a Review</h3>
            <form onSubmit={handleReview}>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <select className="form-input" value={review.rating} onChange={e => setReview(r => ({ ...r, rating: Number(e.target.value) }))}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Your Review</label>
                <textarea className="form-input" rows={4} style={{ resize: 'vertical', borderBottom: '1px solid rgba(153,143,129,0.4)' }}
                  value={review.comment} onChange={e => setReview(r => ({ ...r, comment: e.target.value }))} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
            </form>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section">
            <p className="section-subtitle">You May Also Like</p>
            <div className="grid-4">{related.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}</div>
          </section>
        )}
      </div>
    </main>
  )
}

import { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users/profile').then(r => setProducts(r.data.wishlist || [])).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>

  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-10) var(--space-8)' }}>
        <div className="page-header">
          <p className="section-subtitle">Saved Items</p>
          <h1 style={{ fontFamily: 'var(--font-serif)' }}>My Wishlist</h1>
        </div>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-16) 0', color: 'var(--color-muted)' }}>
            <p>Your wishlist is empty. Start saving pieces you love.</p>
          </div>
        ) : (
          <div className="grid-4" style={{ marginTop: 'var(--space-10)' }}>
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}

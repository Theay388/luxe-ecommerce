import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const COLORS = ['Black', 'White', 'Ivory', 'Camel', 'Navy', 'Charcoal']

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [selSize, setSelSize] = useState('')
  const [selColor, setSelColor] = useState('')

  const category = params.get('category') || ''
  const search = params.get('search') || ''
  const sort = params.get('sort') || 'newest'
  const page = Number(params.get('page') || 1)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const q = new URLSearchParams()
      if (category) q.set('category', category)
      if (search) q.set('search', search)
      if (sort) q.set('sort', sort)
      if (selSize) q.set('size', selSize)
      if (selColor) q.set('color', selColor)
      q.set('page', page)
      const { data } = await api.get(`/products?${q}`)
      setProducts(data.products)
      setTotal(data.total)
      setPages(data.pages)
    } finally { setLoading(false) }
  }, [category, search, sort, page, selSize, selColor])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const setParam = (key, val) => setParams(prev => {
    const n = new URLSearchParams(prev)
    if (val) n.set(key, val); else n.delete(key)
    n.set('page', '1')
    return n
  })

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <p className="breadcrumb"><span>Home</span> / {category || 'All'}</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,4vw,3rem)' }}>
            {category ? `${category}'s Collection` : 'All Collections'}
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-10)', padding: 'var(--space-10) 0' }}>
          {/* SIDEBAR */}
          <aside>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 'var(--space-8)', color: 'var(--color-gold)' }}>Refine</p>
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Category</p>
              {['Women', 'Men', 'Accessories'].map(c => (
                <div key={c} onClick={() => setParam('category', c === category ? '' : c)}
                  style={{ padding: 'var(--space-2) 0', cursor: 'pointer', color: category === c ? 'var(--color-gold-lt)' : 'var(--color-muted)', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                  {c}
                </div>
              ))}
            </div>
            <hr className="divider" />
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Size</p>
              <div className="size-chips">
                {SIZES.map(s => <div key={s} className={`size-chip ${selSize === s ? 'selected' : ''}`} onClick={() => setSelSize(selSize === s ? '' : s)}>{s}</div>)}
              </div>
            </div>
            <hr className="divider" />
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-3)' }}>Color</p>
              <div className="color-swatches">
                {COLORS.map(c => (
                  <div key={c} className={`color-swatch ${selColor === c ? 'selected' : ''}`} title={c}
                    style={{ background: c.toLowerCase() === 'ivory' ? '#f5f0eb' : c.toLowerCase() === 'camel' ? '#c9a96e' : c.toLowerCase() === 'charcoal' ? '#4a4a4a' : c.toLowerCase() === 'white' ? '#ffffff' : c.toLowerCase() }}
                    onClick={() => setSelColor(selColor === c ? '' : c)} />
                ))}
              </div>
            </div>
            <hr className="divider" />
            <button className="btn btn-primary btn-sm" onClick={fetchProducts}>Apply</button>
            <button className="btn-ghost" style={{ marginLeft: '1rem' }} onClick={() => { setSelSize(''); setSelColor(''); setParams({}) }}>Clear All</button>
          </aside>
          {/* GRID */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Showing {products.length} of {total} items</p>
              <select style={{ background: 'var(--color-bg-mid)', color: 'var(--color-text)', border: '1px solid rgba(153,143,129,0.3)', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                value={sort} onChange={e => setParam('sort', e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
            {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
              <>
                <div className="grid-3">{products.map(p => <ProductCard key={p._id} product={p} />)}</div>
                {products.length === 0 && <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-muted)' }}>No products found.</div>}
                {pages > 1 && (
                  <div className="pagination">
                    {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                      <div key={p} className={`pagination__btn ${p === page ? 'active' : ''}`} onClick={() => setParam('page', p)}>{p}</div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

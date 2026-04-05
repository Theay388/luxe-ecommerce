import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      api.get('/products/featured'),
      api.get('/products/new-arrivals')
    ]).then(([f, n]) => {
      setFeatured(f.data)
      setNewArrivals(n.data)
    }).finally(() => setLoading(false))
  }, [])

  const categories = [
    { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', category: 'Women' },
    { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800', category: 'Men' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800', category: 'Kids' },
    { name: 'Babies', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800', category: 'Babies' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', category: 'Accessories' },
  ]

  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: 'var(--space-16) 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0e0e0e 0%, #1c1b1b 60%, #252420 100%)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, zIndex: 0 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>New Collection — Spring 2025</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem,10vw,6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem', maxWidth: '700px' }}>
            Redefine<br /><em style={{ fontWeight: 400, color: 'var(--color-gold-lt)' }}>Your Style</em>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1rem', marginBottom: '2rem', maxWidth: '420px', lineHeight: 1.8 }}>Crafted for those who dare to be different. Explore our curated collection of luxury clothing and accessories.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
            <button className="btn btn-secondary" onClick={() => navigate('/shop?isNewArrival=true')}>New Arrivals</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <p className="section-subtitle">Explore</p>
            <h2 className="section-title">Our Collections</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            {categories.map(cat => (
              <div key={cat.name} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', minHeight: '280px' }}
                onClick={() => navigate(`/shop?category=${cat.category}`)}>
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', transition: 'background 0.3s ease' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.5rem', transition: 'transform 0.3s ease' }}>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Collection</p>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff' }}>{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-low)' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
              <p className="section-subtitle" style={{ margin: 0 }}>Curated</p>
              <h2 className="section-title" style={{ margin: 0 }}>Featured Pieces</h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate('/shop')} style={{ display: 'block', margin: '0 auto var(--space-6)' }}>View All →</button>
            <div className="grid-4">{featured.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}

      {/* BRAND STORY */}
      <section style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem,4vw,2.2rem)', fontStyle: 'italic', color: 'var(--color-text)', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
            "Crafted for those who dare to be different."
          </p>
          <div style={{ width: '60px', height: '1px', background: 'var(--color-gold)', margin: '0 auto 1.5rem' }} />
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>The Style Nest — Est. 2020</p>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
              <p className="section-subtitle" style={{ margin: 0 }}>Just Landed</p>
              <h2 className="section-title" style={{ margin: 0 }}>New Arrivals</h2>
            </div>
            <button className="btn-ghost" onClick={() => navigate('/shop?isNewArrival=true')} style={{ display: 'block', margin: '0 auto var(--space-6)' }}>See All →</button>
            <div className="grid-4">{newArrivals.map(p => <ProductCard key={p._id} product={p} />)}</div>
          </div>
        </section>
      )}

      {loading && <div className="spinner-wrap"><div className="spinner" /></div>}

      {/* NEWSLETTER */}
      <section style={{ background: 'var(--color-bg-low)', padding: 'var(--space-12) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-subtitle">Stay in the Loop</p>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-4)' }}>Exclusive Access</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-6)', fontSize: '0.9rem' }}>Be the first to discover new collections, private events and member-only offers.</p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" className="form-input"
              style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-outline)', marginBottom: 0, textAlign: 'center' }} />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  )
}

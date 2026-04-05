import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const fmt = n => `€${Number(n).toFixed(2)}`
const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Orders', path: '/admin/orders' },
  { label: 'Users', path: '/admin/users' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/orders/stats').then(r => setStats(r.data)).finally(() => setLoading(false))
  }, [])

  const cards = stats ? [
    { label: 'Total Revenue', value: fmt(stats.revenue || 0), change: '+12.4%' },
    { label: 'Total Orders', value: stats.orders || 0, change: '+8.2%' },
    { label: 'Products', value: stats.products || 0, change: '' },
    { label: 'Active Users', value: stats.users || 0, change: '+22.1%' },
  ] : []

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '220px', background: 'var(--color-bg-low)', padding: 'var(--space-8)', flexShrink: 0 }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', letterSpacing: '0.25em', color: 'var(--color-gold-lt)', textTransform: 'uppercase', marginBottom: 'var(--space-10)' }}>Style Nest Admin</p>
        {navItems.map(n => (
          <div key={n.label} onClick={() => navigate(n.path)} style={{ padding: 'var(--space-3) var(--space-4)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: window.location.pathname === n.path ? 'var(--color-gold-lt)' : 'var(--color-muted)', cursor: 'pointer', borderLeft: window.location.pathname === n.path ? '2px solid var(--color-gold-lt)' : '2px solid transparent', marginBottom: 'var(--space-2)', transition: 'color 0.2s' }}>{n.label}</div>
        ))}
        <div onClick={() => navigate('/')} style={{ marginTop: 'var(--space-8)', padding: 'var(--space-3) var(--space-4)', fontSize: '0.75rem', color: 'var(--color-muted)', cursor: 'pointer' }}>← Back to Site</div>
      </aside>
      <main style={{ flex: 1, padding: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 'var(--space-8)' }}>Dashboard</h1>
        {loading ? <div className="spinner-wrap"><div className="spinner" /></div> : (
          <>
            <div className="grid-4" style={{ marginBottom: 'var(--space-10)' }}>
              {cards.map(c => (
                <div key={c.label} style={{ background: 'var(--color-bg-mid)', padding: 'var(--space-6)' }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 'var(--space-2)' }}>{c.label}</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: 'var(--space-2)' }}>{c.value}</p>
                  {c.change && <p style={{ fontSize: '0.75rem', color: 'var(--color-gold)' }}>{c.change}</p>}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ background: 'var(--color-bg-mid)', padding: 'var(--space-6)' }}>
                <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-5)' }}>Recent Orders</p>
                {stats.recentOrders?.map(o => (
                  <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid rgba(153,143,129,0.1)', cursor: 'pointer' }} onClick={() => navigate(`/orders/${o._id}`)}>
                    <div>
                      <p style={{ fontSize: '0.85rem', marginBottom: '2px' }}>#{o._id.slice(-8).toUpperCase()}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>{o.user?.name || 'Guest'}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-gold-lt)' }}>{fmt(o.totalPrice)}</p>
                      <div className={`status-badge ${o.status?.toLowerCase()}`} style={{ justifyContent: 'flex-end' }}>{o.status}</div>
                    </div>
                  </div>
                ))}
                <button className="btn-ghost" style={{ marginTop: 'var(--space-5)' }} onClick={() => navigate('/admin/orders')}>View All Orders →</button>
              </div>
              <div style={{ background: 'var(--color-bg-mid)', padding: 'var(--space-6)' }}>
                <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-5)' }}>Quick Actions</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <button className="btn btn-primary" onClick={() => navigate('/admin/products')}>+ Add Product</button>
                  <button className="btn btn-secondary" onClick={() => navigate('/admin/orders')}>Manage Orders</button>
                  <button className="btn btn-secondary" onClick={() => navigate('/admin/users')}>Manage Users</button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const fmt = n => `€${Number(n).toFixed(2)}`

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/orders/${id}`).then(r => setOrder(r.data)).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>
  if (!order) return <div className="container" style={{ padding: '4rem 0' }}>Order not found.</div>

  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-10) var(--space-8)', maxWidth: '800px' }}>
        <p className="breadcrumb"><span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>My Orders</span> / #{order._id.slice(-8).toUpperCase()}</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', marginTop: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>Order #{order._id.slice(-8).toUpperCase()}</h1>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <div className={`status-badge ${order.status?.toLowerCase()}`}>{order.status}</div>
          <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div style={{ background: 'var(--color-bg-low)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-4)' }}>Items</p>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid rgba(153,143,129,0.1)' }}>
              <img src={item.image} alt={item.name} style={{ width: '60px', height: '75px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Size: {item.size} · Qty: {item.qty}</p>
              </div>
              <p>{fmt(item.price * item.qty)}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div style={{ background: 'var(--color-bg-low)', padding: 'var(--space-6)' }}>
            <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-4)' }}>Delivery Address</p>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.8', color: 'var(--color-muted)' }}>
              {order.shippingAddress?.fullName}<br />
              {order.shippingAddress?.street}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
              {order.shippingAddress?.country}
            </p>
          </div>
          <div style={{ background: 'var(--color-bg-low)', padding: 'var(--space-6)' }}>
            <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-4)' }}>Summary</p>
            {[['Subtotal', fmt(order.itemsPrice)], ['Shipping', order.shippingPrice === 0 ? 'Free' : fmt(order.shippingPrice)], ['Tax', fmt(order.taxPrice)]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)', fontFamily: 'var(--font-serif)' }}>
              <span>Total</span><span style={{ color: 'var(--color-gold-lt)' }}>{fmt(order.totalPrice)}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-secondary" style={{ marginTop: 'var(--space-8)' }} onClick={() => navigate('/profile')}>← Back to Orders</button>
      </div>
    </main>
  )
}

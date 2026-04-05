import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useToast } from '../../context/ToastContext'

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const fmt = n => `€${Number(n).toFixed(2)}`

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const { addToast } = useToast()

  const load = () => api.get('/orders').then(r => setOrders(r.data))
  useEffect(() => { load() }, [])

  const handleStatus = async (id, status) => {
    try { await api.put(`/orders/${id}/status`, { status }); addToast('Status updated'); load() }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
  }

  return (
    <div style={{ flex: 1, padding: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 'var(--space-8)' }}>Orders</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead><tr style={{ borderBottom: '1px solid rgba(153,143,129,0.2)' }}>
          {['Order ID', 'Customer', 'Total', 'Items', 'Status', 'Update'].map(h => <th key={h} style={{ padding: 'var(--space-3) 0', textAlign: 'left', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id} style={{ borderBottom: '1px solid rgba(153,143,129,0.1)' }}>
              <td style={{ padding: 'var(--space-3) 0', fontFamily: 'var(--font-serif)' }}>#{o._id.slice(-8).toUpperCase()}</td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-muted)' }}>{o.user?.name || 'Guest'}</td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-gold-lt)' }}>{fmt(o.totalPrice)}</td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-muted)' }}>{o.items.length}</td>
              <td style={{ padding: 'var(--space-3) 0' }}><div className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</div></td>
              <td style={{ padding: 'var(--space-3) 0' }}>
                <select style={{ background: 'var(--color-bg-mid)', color: 'var(--color-text)', border: '1px solid rgba(153,143,129,0.3)', padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                  value={o.status} onChange={e => handleStatus(o._id, e.target.value)}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-8)' }}>No orders yet.</p>}
    </div>
  )
}

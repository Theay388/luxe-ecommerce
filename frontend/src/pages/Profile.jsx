import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const tabs = ['My Information', 'My Orders', 'Settings']

export default function Profile() {
  const { user, logout, updateUser } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [pwd, setPwd] = useState({ newP: '', confirm: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/orders/mine').then(r => setOrders(r.data)).catch(() => {})
  }, [])

  const saveProfile = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      const { data } = await api.put('/users/profile', form)
      updateUser(data); addToast('Profile updated')
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
    finally { setSaving(false) }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    if (pwd.newP !== pwd.confirm) return addToast('Passwords do not match', 'error')
    try {
      await api.put('/users/profile', { password: pwd.newP })
      addToast('Password updated')
      setPwd({ newP: '', confirm: '' })
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
  }

  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-10) var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-12)' }}>
          <aside style={{ background: 'var(--color-bg-low)', padding: 'var(--space-8)', height: 'fit-content' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-bg-top)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold-lt)', marginBottom: 'var(--space-4)' }}>
              {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-1)' }}>{user?.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: 'var(--space-8)' }}>Member</p>
            {tabs.map((t, i) => (
              <div key={t} onClick={() => setTab(i)} style={{ padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', fontSize: '0.85rem', color: tab === i ? 'var(--color-gold-lt)' : 'var(--color-muted)', borderLeft: tab === i ? '2px solid var(--color-gold-lt)' : '2px solid transparent', marginBottom: 'var(--space-2)', transition: 'color 0.2s' }}>{t}</div>
            ))}
            {user?.role === 'admin' && (
              <div onClick={() => navigate('/admin')} style={{ padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-gold)', marginTop: 'var(--space-4)' }}>⚙ Admin Panel</div>
            )}
            <button className="btn-ghost" style={{ marginTop: 'var(--space-8)', fontSize: '0.75rem', paddingLeft: 'var(--space-4)' }} onClick={() => { logout(); navigate('/') }}>SIGN OUT</button>
          </aside>
          <div>
            {tab === 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>My Information</h2>
                <form onSubmit={saveProfile} style={{ maxWidth: '480px' }}>
                  <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-5)' }}>Personal Details</p>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                  <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                </form>
                <hr className="divider" />
                <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-5)' }}>Change Password</p>
                <form onSubmit={changePassword} style={{ maxWidth: '360px' }}>
                  <div className="form-group"><label className="form-label">New Password</label><input className="form-input" type="password" value={pwd.newP} onChange={e => setPwd(p => ({ ...p, newP: e.target.value }))} minLength={6} /></div>
                  <div className="form-group"><label className="form-label">Confirm Password</label><input className="form-input" type="password" value={pwd.confirm} onChange={e => setPwd(p => ({ ...p, confirm: e.target.value }))} /></div>
                  <button className="btn btn-secondary" type="submit">Update Password</button>
                </form>
              </div>
            )}
            {tab === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>My Orders</h2>
                {orders.length === 0 ? <p style={{ color: 'var(--color-muted)' }}>No orders yet.</p> : orders.map(o => (
                  <div key={o._id} onClick={() => navigate(`/orders/${o._id}`)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5)', background: 'var(--color-bg-low)', marginBottom: 'var(--space-3)', cursor: 'pointer' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-1)' }}>Order #{o._id.slice(-8).toUpperCase()}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ marginBottom: 'var(--space-1)', color: 'var(--color-gold-lt)' }}>£{o.totalPrice?.toFixed(2)}</p>
                      <div className={`status-badge ${o.status?.toLowerCase()}`}>{o.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>Settings</h2>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Notification and preference settings coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

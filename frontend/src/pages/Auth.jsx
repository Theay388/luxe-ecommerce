import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Auth() {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (tab === 'login') await login(form.email, form.password)
      else await register(form.name, form.email, form.password)
      addToast(tab === 'login' ? 'Welcome back!' : 'Account created!')
      navigate(from, { replace: true })
    } catch (err) { addToast(err.response?.data?.message || 'Something went wrong', 'error') }
    finally { setLoading(false) }
  }

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.3em', color: 'var(--color-gold-lt)', marginBottom: 'var(--space-2)' }}>LUXE</div>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>The Atelier Experience</p>
        </div>
        <div style={{ display: 'flex', marginBottom: 'var(--space-8)', borderBottom: '1px solid rgba(153,143,129,0.2)' }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 'var(--space-4)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none', color: tab === t ? 'var(--color-text)' : 'var(--color-muted)', borderBottom: tab === t ? '1px solid var(--color-gold-lt)' : '1px solid transparent', cursor: 'pointer', marginBottom: '-1px', transition: 'color 0.2s' }}>
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Sophia Anderson" autoComplete="name" />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" required value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" minLength={6} />
          </div>
          <button className="btn btn-primary btn-full" type="submit" disabled={loading} style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <button className="btn-ghost btn-full" style={{ textAlign: 'center', display: 'block', margin: '0 auto' }} onClick={() => navigate('/')}>Continue as Guest →</button>
        {tab === 'login' && (
          <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            Admin demo: <span style={{ color: 'var(--color-gold)' }}>admin@luxe.com</span> / admin123
          </p>
        )}
      </div>
    </main>
  )
}

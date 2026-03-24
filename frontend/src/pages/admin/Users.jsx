import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useToast } from '../../context/ToastContext'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const { addToast } = useToast()

  const load = () => api.get('/users').then(r => setUsers(r.data))
  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    try { await api.delete(`/users/${id}`); addToast('User deleted'); load() }
    catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
  }

  return (
    <div style={{ flex: 1, padding: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 'var(--space-8)' }}>Users</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead><tr style={{ borderBottom: '1px solid rgba(153,143,129,0.2)' }}>
          {['Name', 'Email', 'Role', 'Joined', ''].map(h => <th key={h} style={{ padding: 'var(--space-3) 0', textAlign: 'left', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} style={{ borderBottom: '1px solid rgba(153,143,129,0.1)' }}>
              <td style={{ padding: 'var(--space-3) 0', fontFamily: 'var(--font-serif)' }}>{u.name}</td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-muted)' }}>{u.email}</td>
              <td style={{ padding: 'var(--space-3) 0' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: u.role === 'admin' ? 'var(--color-gold-lt)' : 'var(--color-muted)' }}>{u.role}</span>
              </td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-muted)', fontSize: '0.75rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: 'var(--space-3) 0' }}>
                {u.role !== 'admin' && <button className="btn-ghost" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(u._id)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

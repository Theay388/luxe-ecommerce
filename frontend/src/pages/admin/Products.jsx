import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useToast } from '../../context/ToastContext'

const blank = { name: '', description: '', price: '', comparePrice: '', category: 'Women', subcategory: '', sizes: '', colors: '', stock: 10, images: '', isFeatured: false, isNewArrival: false }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { addToast } = useToast()

  const load = () => api.get('/products?limit=50').then(r => setProducts(r.data.products || []))
  useEffect(() => { load() }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price), comparePrice: Number(form.comparePrice), stock: Number(form.stock),
      images: typeof form.images === 'string' ? form.images.split(',').map(s => s.trim()).filter(Boolean) : form.images,
      sizes: typeof form.sizes === 'string' ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : form.sizes,
      colors: typeof form.colors === 'string' ? form.colors.split(',').map(s => s.trim()).filter(Boolean) : form.colors,
    }
    try {
      if (editing) { await api.put(`/products/${editing}`, payload); addToast('Product updated') }
      else { await api.post('/products', payload); addToast('Product created') }
      setForm(blank); setEditing(null); setShowForm(false); load()
    } catch (err) { addToast(err.response?.data?.message || 'Error', 'error') }
  }

  const handleEdit = (p) => {
    setForm({ ...p, images: Array.isArray(p.images) ? p.images.join(', ') : p.images, sizes: Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes, colors: Array.isArray(p.colors) ? p.colors.join(', ') : p.colors })
    setEditing(p._id); setShowForm(true); window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await api.delete(`/products/${id}`); addToast('Deleted'); load()
  }

  return (
    <div style={{ flex: 1, padding: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Products</h1>
        <button className="btn btn-primary btn-sm" onClick={() => { setForm(blank); setEditing(null); setShowForm(!showForm) }}>+ Add Product</button>
      </div>
      {showForm && (
        <div style={{ background: 'var(--color-bg-low)', padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-6)' }}>{editing ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Name</label><input className="form-input" required value={form.name} onChange={e => set('name', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Category</label>
                <select className="form-input" style={{ background: 'var(--color-bg-mid)' }} value={form.category} onChange={e => set('category', e.target.value)}>
                  <option>Women</option><option>Men</option><option>Accessories</option>
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={3} style={{ resize: 'vertical', borderBottom: '1px solid rgba(153,143,129,0.4)' }} required value={form.description} onChange={e => set('description', e.target.value)} /></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Price (£)</label><input className="form-input" type="number" step="0.01" required value={form.price} onChange={e => set('price', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Compare Price (£)</label><input className="form-input" type="number" step="0.01" value={form.comparePrice} onChange={e => set('comparePrice', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Sizes (comma-separated)</label><input className="form-input" value={form.sizes} onChange={e => set('sizes', e.target.value)} placeholder="XS, S, M, L, XL" /></div>
              <div className="form-group"><label className="form-label">Colors</label><input className="form-input" value={form.colors} onChange={e => set('colors', e.target.value)} placeholder="Black, Ivory, Camel" /></div>
            </div>
            <div className="form-group"><label className="form-label">Image URL(s) (comma-separated)</label><input className="form-input" value={form.images} onChange={e => set('images', e.target.value)} /></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Stock</label><input className="form-input" type="number" value={form.stock} onChange={e => set('stock', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Subcategory</label><input className="form-input" value={form.subcategory} onChange={e => set('subcategory', e.target.value)} /></div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-5)' }}>
              <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-muted)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} /> Featured
              </label>
              <label style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-muted)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isNewArrival} onChange={e => set('isNewArrival', e.target.checked)} /> New Arrival
              </label>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button className="btn btn-primary" type="submit">{editing ? 'Update' : 'Create'} Product</button>
              <button className="btn btn-secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead><tr style={{ borderBottom: '1px solid rgba(153,143,129,0.2)' }}>
          {['Product', 'Category', 'Price', 'Stock', ''].map(h => <th key={h} style={{ padding: 'var(--space-3) 0', textAlign: 'left', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>{h}</th>)}
        </tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} style={{ borderBottom: '1px solid rgba(153,143,129,0.1)' }}>
              <td style={{ padding: 'var(--space-3) 0' }}><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <img src={p.images?.[0]} alt={p.name} style={{ width: '40px', height: '50px', objectFit: 'cover', background: 'var(--color-bg-low)' }} />
                <span style={{ fontFamily: 'var(--font-serif)' }}>{p.name}</span>
              </div></td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-muted)' }}>{p.category}</td>
              <td style={{ padding: 'var(--space-3) 0', color: 'var(--color-gold-lt)' }}>£{p.price}</td>
              <td style={{ padding: 'var(--space-3) 0', color: p.stock < 5 ? 'var(--color-error)' : 'var(--color-muted)' }}>{p.stock}</td>
              <td style={{ padding: 'var(--space-3) 0' }}>
                <button className="btn-ghost" style={{ marginRight: 'var(--space-4)' }} onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn-ghost" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

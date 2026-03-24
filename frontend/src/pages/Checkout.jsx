import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const fmt = n => `£${Number(n).toFixed(2)}`
const STEPS = ['Shipping', 'Review', 'Payment', 'Confirmation']

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [addr, setAddr] = useState({ fullName: '', street: '', city: '', state: '', country: 'UK', postalCode: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)

  const shipping = cartTotal >= 200 ? 0 : 9.99
  const tax = cartTotal * 0.1
  const total = cartTotal + shipping + tax

  const handleOrder = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/orders', {
        items: cart.map(i => ({ product: i.product, name: i.name, image: i.image, price: i.price, size: i.size, color: i.color, qty: i.qty })),
        shippingAddress: addr, paymentMethod: 'card',
        itemsPrice: cartTotal, shippingPrice: shipping, taxPrice: tax, totalPrice: total
      })
      setOrder(data)
      clearCart()
      setStep(3)
    } catch (err) { addToast(err.response?.data?.message || 'Order failed', 'error') }
    finally { setLoading(false) }
  }

  const stepStyle = (i) => ({
    padding: '0.5rem 1.25rem', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
    color: i === step ? 'var(--color-gold-lt)' : 'var(--color-muted)',
    borderBottom: i === step ? '1px solid var(--color-gold-lt)' : '1px solid transparent'
  })

  return (
    <main>
      <div className="container" style={{ maxWidth: '860px', padding: 'var(--space-10) var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>Checkout</h1>
        <div style={{ display: 'flex', gap: 0, marginBottom: 'var(--space-10)', borderBottom: '1px solid rgba(153,143,129,0.15)' }}>
          {STEPS.map((s, i) => <span key={s} style={stepStyle(i)}>{i + 1}. {s}</span>)}
        </div>

        {step === 0 && (
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>Shipping Address</h2>
            {Object.entries(addr).map(([key, val]) => (
              <div className="form-group" key={key}>
                <label className="form-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input className="form-input" value={val} onChange={e => setAddr(a => ({ ...a, [key]: e.target.value }))} />
              </div>
            ))}
            <button className="btn btn-primary" onClick={() => setStep(1)} disabled={!addr.fullName || !addr.street}>Continue →</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-6)' }}>Review Your Order</h2>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid rgba(153,143,129,0.1)' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '75px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Size: {item.size} · Qty: {item.qty}</p>
                </div>
                <p>{fmt(item.price * item.qty)}</p>
              </div>
            ))}
            <div style={{ marginTop: 'var(--space-4)', background: 'var(--color-bg-low)', padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span style={{ color: 'var(--color-muted)' }}>Subtotal</span><span>{fmt(cartTotal)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span style={{ color: 'var(--color-muted)' }}>Shipping</span><span>{shipping === 0 ? 'Free' : fmt(shipping)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}><span style={{ color: 'var(--color-muted)' }}>Tax</span><span>{fmt(tax)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}><span>Total</span><span style={{ color: 'var(--color-gold-lt)' }}>{fmt(total)}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
              <button className="btn btn-secondary" onClick={() => setStep(0)}>← Back</button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>Continue →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: '420px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>Payment</h2>
            <div style={{ background: 'var(--color-bg-low)', padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-4)' }}>Card Details</p>
              {[['Card Number', '•••• •••• •••• 4242'], ['Expiry', '12/27'], ['CVV', '•••']].map(([l, ph]) => (
                <div className="form-group" key={l}><label className="form-label">{l}</label><input className="form-input" placeholder={ph} /></div>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>🔒 This is a simulated payment for demo purposes. No real charge will be made.</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={handleOrder} disabled={loading}>{loading ? 'Placing Order...' : `Pay ${fmt(total)}`}</button>
            </div>
          </div>
        )}

        {step === 3 && order && (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--color-gold-lt)', marginBottom: 'var(--space-6)' }}>✦</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 'var(--space-4)' }}>Order Confirmed</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-6)' }}>Order #{order._id.slice(-8).toUpperCase()} · Thank you for your purchase.</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/profile')}>View Orders</button>
              <button className="btn btn-secondary" onClick={() => navigate('/shop')}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

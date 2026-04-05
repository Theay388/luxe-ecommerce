import { useNavigate } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const fmt = n => `€${Number(n).toFixed(2)}`

export default function Cart() {
  const { cart, updateQty, removeItem, cartTotal } = useCart()
  const navigate = useNavigate()
  const shipping = cartTotal >= 200 ? 0 : 9.99
  const tax = cartTotal * 0.1
  const total = cartTotal + shipping + tax

  if (cart.length === 0) return (
    <div className="container" style={{ padding: 'var(--space-24) 0', textAlign: 'center', minHeight: '60vh' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-4)' }}>Your Cart is Empty</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-8)' }}>Discover our curated collection and find your perfect piece.</p>
      <button className="btn btn-primary" onClick={() => navigate('/shop')}>Explore Collections</button>
    </div>
  )

  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-8) var(--space-4)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>
          Your Cart — {cart.reduce((s, i) => s + i.qty, 0)} Item{cart.length !== 1 ? 's' : ''}
        </h1>
        <div className="cart-layout">
          {/* Items */}
          <div>
            {cart.map((item, idx) => (
              <div key={idx} className="cart-item">
                <div className="cart-item__img"
                  onClick={() => navigate(`/product/${item.product}`)}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__info">
                  <p style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-1)' }}>{item.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: 'var(--space-3)' }}>Size: {item.size} · Color: {item.color}</p>
                  <div className="qty-stepper">
                    <button className="qty-stepper__btn" onClick={() => updateQty(item._id, Math.max(1, item.qty - 1), item.product, item.size)}>−</button>
                    <span className="qty-stepper__val">{item.qty}</span>
                    <button className="qty-stepper__btn" onClick={() => updateQty(item._id, item.qty + 1, item.product, item.size)}>+</button>
                  </div>
                </div>
                <div className="cart-item__actions">
                  <p style={{ marginBottom: 'var(--space-3)' }}>{fmt(item.price * item.qty)}</p>
                  <button onClick={() => removeItem(item._id, item.product, item.size, item.color)}
                    style={{ color: 'var(--color-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--color-error)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
            <button className="btn-ghost" onClick={() => navigate('/shop')}>← Continue Shopping</button>
          </div>
          {/* Summary */}
          <div className="cart-summary">
            <p className="text-uppercase text-small text-muted" style={{ marginBottom: 'var(--space-5)' }}>Order Summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ color: 'var(--color-muted)' }}>Subtotal</span><span>{fmt(cartTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ color: 'var(--color-muted)' }}>Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : fmt(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
              <span style={{ color: 'var(--color-muted)' }}>Tax (10%)</span><span>{fmt(tax)}</span>
            </div>
            <hr className="divider divider-gold" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-gold-lt)' }}>{fmt(total)}</span>
            </div>
            <button className="btn btn-primary btn-full" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-muted)', marginTop: 'var(--space-4)' }}>🔒 Secure checkout · Free returns</p>
          </div>
        </div>
      </div>
    </main>
  )
}

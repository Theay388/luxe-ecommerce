import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">STYLE NEST</div>
            <p className="footer__desc">Crafted for those who dare to be different. Luxury clothing and accessories for the discerning individual.</p>
          </div>
          <div>
            <div className="footer__heading">Collections</div>
            <Link to="/shop?category=Women" className="footer__link">Women</Link>
            <Link to="/shop?category=Men" className="footer__link">Men</Link>
            <Link to="/shop?category=Kids" className="footer__link">Kids</Link>
            <Link to="/shop?category=Babies" className="footer__link">Babies</Link>
            <Link to="/shop?category=Accessories" className="footer__link">Accessories</Link>
            <Link to="/shop?sale=true" className="footer__link">Sale</Link>
          </div>
          <div>
            <div className="footer__heading">Account</div>
            <Link to="/profile" className="footer__link">My Account</Link>
            <Link to="/profile" className="footer__link">Orders</Link>
            <Link to="/wishlist" className="footer__link">Wishlist</Link>
            <Link to="/auth" className="footer__link">Sign In</Link>
          </div>
          <div>
            <div className="footer__heading">Help</div>
            <span className="footer__link" style={{ cursor: 'default' }}>Shipping & Returns</span>
            <span className="footer__link" style={{ cursor: 'default' }}>Size Guide</span>
            <span className="footer__link" style={{ cursor: 'default' }}>Contact Us</span>
            <span className="footer__link" style={{ cursor: 'default' }}>Privacy Policy</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© 2025 Style Nest. All rights reserved.</span>
          <span className="footer__copy text-muted">Visa · Mastercard · PayPal</span>
        </div>
      </div>
    </footer>
  )
}

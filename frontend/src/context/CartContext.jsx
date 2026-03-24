import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex(i => i.product === action.item.product && i.size === action.item.size && i.color === action.item.color)
      if (idx > -1) {
        const updated = [...state]
        updated[idx].qty = action.item.qty
        return updated
      }
      return [...state, action.item]
    }
    case 'UPDATE':
      return state.map(i =>
        (i._id === action.id || (i.product === action.product && i.size === action.size))
          ? { ...i, qty: action.qty }
          : i
      )
    case 'REMOVE':
      return state.filter(i =>
        !(i._id === action.id || (i.product === action.product && i.size === action.size && i.color === action.color))
      )
    case 'CLEAR': return []
    case 'SET': return action.items
    default: return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const saved = localStorage.getItem('luxe_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => dispatch({ type: 'ADD', item })
  const updateQty = (id, qty, product, size) => dispatch({ type: 'UPDATE', id, qty, product, size })
  const removeItem = (id, product, size, color) => dispatch({ type: 'REMOVE', id, product, size, color })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const setCart = (items) => dispatch({ type: 'SET', items })

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, setCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

import { useEffect, useState, useMemo } from 'react'
import { db } from '../data/db'


export const useCart = () => {
     const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
     }

    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
  
useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

const addToCart = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {//existe en el carrito
        if (cart[itemExist].quantity >= MAX_ITEMS) return 
        const updatedCart = [...cart]
        updatedCart[itemExist].quantity++
        setCart(updatedCart)
    }else{
        item.quantity = 1
        setCart([...cart, item])
    }
}

const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

const incrementandoItem = (id) => {
    const updateQuantity = cart.map( item => {
        if (item.id === id && item.quantity < MAX_ITEMS) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
})
    setCart(updateQuantity)
}

const decrementarItem = (id) => {
    const updateQuantityDecrement = cart.map( item => {
    if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
                ...item,
                quantity: item.quantity - 1
            }
        }
    return item
    })
    setCart(updateQuantityDecrement)
}

const clearCart = () => {
    setCart([])
}

const isEmpty = useMemo(() => {
     cart.length === 0
}, [cart])

const cartTotal = useMemo(() => cart.reduce( (acc, item) => acc + (item.quantity * item.price), 0),[cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decrementarItem,
        incrementandoItem,
        clearCart,
        isEmpty,
        cartTotal
    }
}
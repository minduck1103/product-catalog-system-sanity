'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import AddToCartModal from '../components/AddToCartModal'

interface CartItem {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, change: number) => void
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [showModal, setShowModal] = useState(false)

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...currentItems, newItem]
    })
    setShowModal(true)
  }

  const removeItem = (id: string) => {
    setItems(items => items.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, change: number) => {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        itemCount
      }}
    >
      {children}
      <AddToCartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 
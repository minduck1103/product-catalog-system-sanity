import { useEffect } from 'react'

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddToCartModal({ isOpen, onClose }: AddToCartModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
      Product added to cart successfully!
    </div>
  )
} 
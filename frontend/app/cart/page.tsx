'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useCart } from '@/app/context/CartContext'
import { urlFor } from '@/lib/sanity.client'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 text-black">Your cart</h1>
            <p className="mb-8 text-black">
              Your cart is empty.{' '}
              <Link href="/shop" className="underline">
                Continue Shopping
              </Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col items-center">
          <div className="w-full md:flex md:gap-8 max-w-6xl">
            {/* Left Column - Cart Items */}
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-black">Your cart</h1>
              <p className="mb-8 text-black">
                Not ready to checkout?{' '}
                <Link href="/shop" className="underline">
                  Continue Shopping
                </Link>
              </p>

              {/* Cart Items */}
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b">
                    <div className="w-24 h-24 bg-gray-200 relative">
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-black">{item.name}</h3>
                      <p className="text-black mb-1">Size: {item.size}</p>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-black">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 text-black hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300 text-black">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 text-black hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-lg font-medium text-black">${item.price * item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-black underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-6 text-black">Order Summary</h2>
                
                {/* Coupon Input */}
                <input
                  type="text"
                  placeholder="Enter coupon code here"
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-6 text-black"
                />

                {/* Order Details */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-black">Subtotal</span>
                    <span className="text-black">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Shipping</span>
                    <span className="text-black">Calculated at the next step</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t">
                    <span className="font-bold text-black">Total</span>
                    <span className="font-bold text-black">${subtotal}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-3 rounded mt-6">
                  Continue to checkout
                </button>
              </div>

              {/* Order Information */}
              <div className="mt-8 space-y-4">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4 text-black">Order Information</h3>
                </div>
                
                {/* Return Policy */}
                <div className="border-b pb-4">
                  <button className="flex justify-between items-center w-full">
                    <span className="text-black">Return Policy</span>
                    <span className="text-black">−</span>
                  </button>
                  <p className="text-black mt-2">
                    This is our example return policy which is everything you need to know about our returns.
                  </p>
                </div>

                {/* Shipping Options */}
                <div className="border-b pb-4">
                  <button className="flex justify-between items-center w-full">
                    <span className="text-black">Shipping Options</span>
                    <span className="text-black">+</span>
                  </button>
                </div>

                {/* Shipping Options (Duplicate) */}
                <div className="border-b pb-4">
                  <button className="flex justify-between items-center w-full">
                    <span className="text-black">Shipping Options</span>
                    <span className="text-black">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 
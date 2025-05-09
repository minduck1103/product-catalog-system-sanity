'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#f5f6fa] text-black py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8">
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-bold mb-4" >Sign up for our newsletter</h3>
            <p className="mb-4">Be the first to know about our special offers, new product launches, and events</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
                Sign Up
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop/women" className="hover:underline">Women&apos;s</Link></li>
              <li><Link href="/shop/men" className="hover:underline">Men&apos;s</Link></li>
              <li><Link href="/shop/kids" className="hover:underline">Kids&apos;</Link></li>
              <li><Link href="/shop/shoes" className="hover:underline">Shoes</Link></li>
              <li><Link href="/shop/equipment" className="hover:underline">Equipment</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/help/customer-service" className="hover:underline">Customer Service</Link></li>
              <li><Link href="/help/track-order" className="hover:underline">Track Order</Link></li>
              <li><Link href="/help/returns" className="hover:underline">Returns & Exchanges</Link></li>
              <li><Link href="/help/shipping" className="hover:underline">Shipping</Link></li>
              <li><Link href="/help/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link href="/about/our-story" className="hover:underline">Our Story</Link></li>
              <li><Link href="/about/careers" className="hover:underline">Careers</Link></li>
              <li><Link href="/about/responsibility" className="hover:underline">Responsibility</Link></li>
              <li><Link href="/about/press" className="hover:underline">Press</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 
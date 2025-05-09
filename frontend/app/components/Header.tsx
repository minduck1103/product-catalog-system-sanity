'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useCart()

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-[60px] bg-[#111] text-white z-50">
        <div className="max-w-[1400px] h-full mx-auto px-12 flex items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold">
              Ecommerce
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/shop" className="font-bold">
                Shop
              </Link>
              <Link href="/stories">
                Stories
              </Link>
              <Link href="/about">
                About
              </Link>
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSearch}>
                {isSearchOpen ? (
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-[#111] border border-gray-600 rounded px-3 py-1 focus:outline-none focus:border-white"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                ) : (
                  <>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                      />
                    </svg>
                    <span>Search</span>
                  </>
                )}
              </div>
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Link href="/cart" className="relative">
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
            <Link href="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="border-b border-white w-full"></div>
      </header>
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[60px]"></div>
    </>
  )
}

export default Header 
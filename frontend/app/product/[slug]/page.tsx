'use client'

import { useState } from 'react'
import { client } from '@/lib/sanity.client'
import { productBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity.client'
import { Product } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import ProductCard from '@/app/components/ProductCard'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/app/context/CartContext'

async function getProduct(slug: string) {
  const product = await client.fetch(productBySlugQuery(slug))
  return product
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('XL')
  const { addItem } = useCart()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)

  // Fetch product data
  useState(() => {
    const loadProduct = async () => {
      const resolvedParams = await Promise.resolve(params)
      const productData = await getProduct(resolvedParams.slug)
      setProduct(productData)
    }
    loadProduct()
  }, [params])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: product.images[0]
    })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/cart')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 pt-16 max-w-7xl">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="md:flex md:gap-12 md:p-8">
                {/* Product Images */}
                <div className="md:w-1/2 relative">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={urlFor(product.images[0]).url()}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.images.length > 1 && (
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-black rounded-full p-2">
                        <ChevronRightIcon className="h-6 w-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 p-6 md:p-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="text-2xl text-black mb-4">
                    ${product.price.toLocaleString()}
                  </div>
                  
                  <p className="text-gray-700 mb-8 min-h-[150px]">{product.description}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-16 text-center border-x border-gray-300 text-black">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Size Selector */}
                    <div className="relative">
                      <select 
                        className="appearance-none border border-gray-300 rounded px-4 py-2 pr-8 bg-white text-black"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <option>XL</option>
                        <option>L</option>
                        <option>M</option>
                        <option>S</option>
                      </select>
                    </div>
                  </div>

                  {/* Model Info */}
                  <div className="text-sm text-gray-500 mb-8">
                    Height of model: 189 cm. / 6&apos;2&quot; Size 41
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-black text-white py-3 px-6 rounded hover:bg-gray-900"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={handleBuyNow}
                      className="flex-1 bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {product.related && product.related.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {product.related.map((relatedProduct: Product) => (
                    <ProductCard
                      key={relatedProduct._id}
                      product={relatedProduct}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 
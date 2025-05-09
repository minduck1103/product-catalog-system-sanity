'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Banner from './components/Banner'
import Header from './components/Header'
import Filters from './components/Filters'
import ShopSortBar from './components/ShopSortBar'
import ProductCard from './components/ProductCard'
import LoadMoreButton from './components/LoadMoreButton'
import Footer from './components/Footer'
import { client } from '@/lib/sanity.client'
import { categoriesQuery, filteredProductsQuery } from '@/lib/queries'
import { Product, Category } from '@/types'

const ITEMS_PER_PAGE = 6

const Home: React.FC = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await client.fetch<Category[]>(categoriesQuery)
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const category = searchParams.get('category')
        const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
        const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
        const sortBy = searchParams.get('sort') || '_createdAt desc'

        const countQuery = filteredProductsQuery({
          categories: category ? [category] : undefined,
          minPrice,
          maxPrice,
          sortBy
        })
        const allProducts = await client.fetch<Product[]>(countQuery)
        setProducts(allProducts)
        setTotalProducts(allProducts.length)
        
        // Initially display first 6 products
        setDisplayedProducts(allProducts.slice(0, ITEMS_PER_PAGE))
        setHasMore(allProducts.length > ITEMS_PER_PAGE)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  const handleFilterChange = () => {
    // URL updates are handled in the Filters component
  }

  const handleSortChange = () => {
    // URL updates are handled in the ShopSortBar component
  }

  const handleLoadMore = () => {
    const currentLength = displayedProducts.length
    const nextProducts = products.slice(currentLength, currentLength + ITEMS_PER_PAGE)
    setDisplayedProducts([...displayedProducts, ...nextProducts])
    setHasMore(currentLength + ITEMS_PER_PAGE < products.length)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner />
      <main className="max-w-[1400px] mx-auto">
        <div className="px-12 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <Filters
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="w-full lg:w-3/4">
              <ShopSortBar
                totalProducts={totalProducts}
                onSortChange={handleSortChange}
                currentPage={1}
                totalPages={1}
              />

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {hasMore && (
                    <LoadMoreButton onClick={handleLoadMore} />
                  )}

                  {displayedProducts.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <h3 className="text-xl text-gray-600">No products found</h3>
                      <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home

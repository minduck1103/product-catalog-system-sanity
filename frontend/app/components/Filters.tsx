'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'

interface FiltersProps {
  categories: Category[]
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  category?: string
}

const colors = [
  '#DF9167', '#7B61FF', '#219653', '#2F80ED', '#EB5757',
  '#56CCF2', '#4F4F4F', '#BB6BD9', '#F2F2F2', '#6FCF97',
]

export default function Filters({ categories, onFilterChange }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<FilterState>({
    category: undefined
  })

  useEffect(() => {
    const category = searchParams.get('category') || undefined
    setFilters({ category })
  }, [searchParams])

  const handleCategoryChange = (categorySlug: string) => {
    const newCategory = filters.category === categorySlug ? undefined : categorySlug
    const newFilters = { category: newCategory }
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateURL(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      category: undefined
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
    updateURL(newFilters)
  }

  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newFilters.category) {
      params.set('category', newFilters.category)
    } else {
      params.delete('category')
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <aside className="w-full lg:w-64 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear filters
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category._id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === category.slug.current}
                onChange={() => handleCategoryChange(category.slug.current)}
                className="w-4 h-4 border-gray-300 rounded accent-black focus:ring-0"
              />
              <span className="ml-2 text-gray-700">{category.name}</span>
            </label>
          ))}
          </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">Color</h3>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <span
              key={color}
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-sm hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </aside>
  )
} 
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface ShopSortBarProps {
  totalProducts: number
  onSortChange: (sortBy: string) => void
  currentPage: number
  totalPages: number
}

export default function ShopSortBar({ 
  totalProducts, 
  onSortChange,
  currentPage,
  totalPages 
}: ShopSortBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.set('page', '1') // Reset to first page when sorting changes
    router.push(`?${params.toString()}`, { scroll: false })
    onSortChange(value)
  }

  const sortOptions = {
    '_createdAt desc': 'Popular',
    'price desc': 'Price: High to Low',
    'price asc': 'Price: Low to High',
    'name asc': 'Name: A-Z',
    'name desc': 'Name: Z-A',
  }

  const defaultSort = '_createdAt desc'

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
      <div className="mb-4 sm:mb-0">
        <span className="text-gray-600">
          Showing {totalProducts} Product{totalProducts !== 1 ? 's' : ''}
          {totalPages > 1 && ` - Page ${currentPage} of ${totalPages}`}
        </span>
      </div>
      
      <div className="flex items-center">
        <label htmlFor="sort" className="text-gray-600 mr-2">
          Sort By:
        </label>
        <select
          id="sort"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
          onChange={handleSortChange}
          defaultValue={defaultSort}
        >
          {Object.entries(sortOptions).map(([value, label]) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
} 
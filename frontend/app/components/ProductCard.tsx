import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product.slug.current}`}>
        <div className="relative aspect-square">
          <Image
            src={urlFor(product.images[0]).width(500).height(500).url()}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <span className="text-gray-600 font-medium">M</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  )
} 
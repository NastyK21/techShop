"use client"

import { Search } from "lucide-react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/types"

interface ProductListProps {
  products: Product[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  onDelete?: (id: string) => Promise<void>
  loading?: boolean
  error?: string
}

export default function ProductList({
  products,
  searchQuery,
  setSearchQuery,
  onDelete,
  loading,
  error
}: ProductListProps) {
  if (loading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border dark:border-gray-700 rounded-lg p-3 pl-11 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-md transition-colors"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchQuery
              ? "No products match your search"
              : "No products added yet. Add some products to see them here!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

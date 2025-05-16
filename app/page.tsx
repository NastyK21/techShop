"use client"

import { useState, useEffect } from "react"
import { Tab } from "@headlessui/react"
import { Inter } from "next/font/google"
import ProductSubmissionForm from "@/components/product-submission-form"
import ProductList from "@/components/product-list"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Product } from "@/lib/types"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
      setError("")
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Add product
  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error('Failed to add product')
    }

    await fetchProducts()
  }

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      await fetchProducts()
      setError("")
    } catch (err) {
      setError('Failed to delete product')
      throw err // Re-throw to show error in the UI
    }
  }

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Initial fetch
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main
      className={`min-h-screen p-4 md:p-8 ${inter.className} bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            TechShop
          </h1>
          <ThemeToggle />
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 mb-8 shadow-lg">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-200
                ${selected
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              Product Submission
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-200
                ${selected
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              My Products
            </Tab>
          </Tab.List>
          <Tab.Panels className="transition-all duration-300">
            <Tab.Panel className="transform transition-all duration-300">
              <ProductSubmissionForm onAddProduct={handleAddProduct} />
            </Tab.Panel>
            <Tab.Panel className="transform transition-all duration-300">
              <ProductList
                products={filteredProducts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onDelete={handleDeleteProduct}
                loading={loading}
                error={error}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  )
}

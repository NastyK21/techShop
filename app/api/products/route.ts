import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/products - Get all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, price, description, image } = body

        if (!name || !price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            )
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: Number(price),
                description,
                image
            }
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
} 
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET /api/products/[id] - Get a single product
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        const product = await prisma.product.findUnique({
            where: { id }
        })

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        )
    }
}

// PUT /api/products/[id] - Update a product
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        const body = await request.json()
        const { name, price, description, image } = body

        if (!name || !price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            )
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price: Number(price),
                description,
                image
            }
        })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        )
    }
}


// DELETE /api/products/[id]
export async function DELETE(
    request: Request,
    context: { params: { id: string } } // ⚠ Use `context` instead of destructuring `params` directly
) {
    const { id } = context.params; // ✅ Destructure inside function

    try {
        const productId = parseInt(id, 10);

        await prisma.product.delete({
            where: { id: productId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}

// DELETE /api/products/[id] - Delete a product

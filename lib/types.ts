export interface Product {
    id: number            // Also update `id` to match Prisma type (Int)
    name: string
    price: number
    description?: string
    image?: string        // ✅ match Prisma field name
}

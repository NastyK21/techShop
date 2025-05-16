# TechShop E-commerce UI

A modern, responsive e-commerce user interface built with Next.js 15, TypeScript, and Tailwind CSS. This application provides a seamless shopping experience with features for product management and listing.

## 🚀 Features

- Modern, responsive UI with dark mode support
- Product submission and management
- Real-time product search and filtering
- PostgreSQL database integration with Prisma ORM
- Server-side rendering with Next.js
- Theme customization with shadcn/ui components
- Type-safe development with TypeScript

## 🛠️ Tech Stack

- **Framework:** Next.js 15.2.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Radix UI primitives
  - Headless UI components
  - shadcn/ui
- **Database:** PostgreSQL with Prisma ORM
- **State Management:** React Hooks
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Lucide React

## 📦 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm package manager

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <https://github.com/NastyK21/techShop>

```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="your_postgresql_connection_string"
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Render Deployment Configuration

- **Branch:** main
- **Region:** Singapore (Southeast Asia)
- **Build Command:**
  ```bash
  npm install; npm run build
  ```
- **Start Command:**
  ```bash
  npm run start
  ```

Make sure to configure the following environment variables in your Render dashboard:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: Set to "production"

## 🗄️ Project Structure

```
ecommerce-ui/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── globals.css       # Global styles
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── components.json       # shadcn/ui configuration
```

## 🔒 Environment Variables

The following environment variables are required:

- `DATABASE_URL`: PostgreSQL database connection string

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. 

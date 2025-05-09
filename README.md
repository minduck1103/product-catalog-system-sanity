# E-commerce Project with Next.js and Sanity

This is an e-commerce project built with Next.js for the frontend and Sanity as the headless CMS.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Sanity CLI (`npm install -g @sanity/cli`)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-10
NEXT_PUBLIC_SANITY_USE_CDN=true
```

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/minduck1103/product-catalog-system-sanity.git>
cd <>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install Sanity Studio dependencies:
```bash
cd sanity_app
npm install
```

## Setting up Sanity

1. Create a Sanity account at https://www.sanity.io/
2. Create a new project
3. Copy your project ID and add it to the `.env` file
4. Deploy Sanity Studio:
```bash
cd sanity_app
sanity deploy
```

## Running the Project

1. Start the frontend development server:
```bash
cd frontend
npm run dev
```

2. Start Sanity Studio:
```bash
cd sanity_app
npm run dev
```

The frontend will be available at `http://localhost:3000`
Sanity Studio will be available at `http://localhost:3333`

## Project Structure

```
├── frontend/           # Next.js frontend application
│   ├── app/           # App router components
│   ├── components/    # Reusable components
│   ├── lib/          # Utility functions and configurations
│   └── public/       # Static assets
│
└── sanity_app/       # Sanity Studio
    ├── schemas/      # Content type definitions
    └── structure/    # Desk structure customization
```

## Features

- Responsive design
- Product catalog
- Shopping cart functionality
- Product details page
- Category filtering
- Search functionality
- Newsletter subscription

## Important Notes

1. Make sure to set up your own Sanity project and update the environment variables
2. The Sanity schema needs to be deployed to your project
3. Initial content needs to be created in Sanity Studio

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

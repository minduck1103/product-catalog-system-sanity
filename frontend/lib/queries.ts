export const productsQuery = `*[_type == "product"] {
  _id,
  name,
  slug,
  images,
  price,
  description,
  category->,
  stock
} | order(_createdAt desc)`

export const categoriesQuery = `*[_type == "category"] {
  _id,
  name,
  slug,
  description
}`

export const productsByCategory = (categoryId: string) => `*[_type == "product" && category._ref == "${categoryId}"] {
  _id,
  name,
  slug,
  images,
  price,
  description,
  category->,
  stock
}`

export const productBySlugQuery = (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0] {
  _id,
  name,
  slug,
  images,
  price,
  description,
  category->,
  stock,
  "related": *[_type == "product" && category._ref == ^.category._ref && slug.current != "${slug}"][0...4] {
    _id,
    name,
    slug,
    images,
    price,
    description,
    category->,
    stock
  }
}`

export const filteredProductsQuery = ({
  categories,
  minPrice,
  maxPrice,
  sortBy = '_createdAt desc'
}: {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}) => {
  let filters = [`_type == "product"`];
  
  if (categories && categories.length > 0) {
    filters.push(`category->slug.current in [${categories.map(c => `"${c}"`).join(',')}]`);
  }
  
  if (minPrice !== undefined) {
    filters.push(`price >= ${minPrice}`);
  }
  
  if (maxPrice !== undefined) {
    filters.push(`price <= ${maxPrice}`);
  }

  return `*[${filters.join(' && ')}] {
    _id,
    name,
    slug,
    images,
    price,
    description,
    category->,
    stock
  } | order(${sortBy})`
} 
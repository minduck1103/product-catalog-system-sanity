export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  }[];
  price: number;
  description?: string;
  category?: {
    _ref: string;
    _type: 'reference';
  };
  stock: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
} 
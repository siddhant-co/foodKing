// export interface Product {
//   subcategory: any;
//   category: any;
//   variants: any;
//   productVariants: any;
//   slug: any;
//   tags: any;
//   id: number;
//   name: string;
//   basePrice: number;
//   oldPrice: number;
//   imageUrl: string;
//   description: string
//   sellingPrice: number;
//   productId:number

// }



// types/product.ts

export interface Variant {
  basePrice: number;
  id: number;
  name: string;
  price: number;
  stock: number;
  images: { url: string }[];
  variantId:number
}

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  slug: any;
  id: number;
  name: string;
  categoryId: number;
}

export interface Product {
  id: number;
  productId: number;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  oldPrice: number;
  sellingPrice: number;
  imageUrl: string;
  tags: string[];
  category: Category;
  subcategory: Subcategory;
  variants: Variant[];
  productVariants: Variant[];
}

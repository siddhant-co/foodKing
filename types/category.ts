// export interface Subcategory {
//   products: any;
//   id: number;
//   name: string;
//   categoryId: number;
//   createdAt: string;
//   slug: string;
//   isDeleted: boolean;
//   imageUrl: string;
//   publicId: string;
// }

// export interface Category {
//   products: any;
//   id: number;
//   name: string;
//   createdAt: string;
//   slug: string;
//   isDeleted: boolean;
//   imageUrl: string;
//   publicId: string;
//   subcategories: Subcategory[];
// }


// types/category.ts
import { Product } from "./product";

export interface Subcategory {
  products: Product[]; // 🔄 Replaced `any` with `Product[]`
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
  slug: string;
  isDeleted: boolean;
  imageUrl: string;
  publicId: string;
}

export interface Category {
  products: Product[]; // 🔄 Replaced `any` with `Product[]`
  id: number;
  name: string;
  createdAt: string;
  slug: string;
  isDeleted: boolean;
  imageUrl: string;
  publicId: string;
  subcategories: Subcategory[];
}

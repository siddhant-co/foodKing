export interface Subcategory {
  products: any;
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
  products: any;
  id: number;
  name: string;
  createdAt: string;
  slug: string;
  isDeleted: boolean;
  imageUrl: string;
  publicId: string;
  subcategories: Subcategory[];
}
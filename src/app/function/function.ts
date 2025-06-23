import { Category } from "../../../types/category";
import { Product, Subcategory } from "../../../types/product";


export async function fetchBanners() {
  try {
    const res = await fetch("https://ecom-testing.up.railway.app/banners", {
      cache: "no-store", // Ensures fresh data on each request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Optional: Defensive check
    if (!Array.isArray(data)) {
      console.warn("Expected banner data to be an array, got:", data);
      return [];
    }

    return data;
  } catch (error: unknown) {
    console.error("Failed to fetch banners:", (error as Error).message);
    return []; // Safe fallback
  }
}



// Products

// lib/Function.ts



export async function fetchProducts(page: number = 1, limit: number = 6): Promise<Product[]> {
  try {
    const res = await fetch(`https://ecom-testing.up.railway.app/product?page=${page}&limit=${limit}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      console.warn('Expected product data to be an array, got:', data);
      return [];
    }

    return data.data as Product[]; // Type assertion for safety
  } catch (error: unknown) {
    console.error('Failed to fetch products:', (error as Error).message);
    return [];
  }
}

// category
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`https://ecom-testing.up.railway.app/category/subcategory`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json(); // Add `await`
  } catch (error: unknown) {
    console.error('Error fetching categories:', (error as Error).message);
    return [];
  }
}



export async function fetchSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
  const res = await fetch(`https://ecom-testing.up.railway.app/category/subcategory/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}





export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://ecom-testing.up.railway.app/product/info/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (error: unknown) {
    console.error((error as Error).message);
    return null;
  }
}


// cart

// Fetch all cart items
export const fetchCartItems = async (token: string | null) => {
  const response = await fetch('https://ecom-testing.up.railway.app/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  
    },
  });

  if (!response.ok) throw new Error('Failed to fetch cart items');
  return response.json();
};


// Delete a specific item
export const deleteCartItem = async (itemId: number, token: string | null) => {
  if (!token) throw new Error("No token provided");

  const response = await fetch(`https://ecom-testing.up.railway.app/cart/remove/${itemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return await response.json(); // or response.text(), depending on your API
};


// Clear the entire cart
export const clearCart = async (token: string) => {
  const response = await fetch(`https://ecom-testing.up.railway.app/cart/clear`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to clear cart');
};



export const addToCartApi = async (
  { productId, quantity }: { productId: number; quantity: number; variantId?: number | null },
  token: string
) => {
  const response = await fetch(`https://ecom-testing.up.railway.app/cart/add`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity}),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  const result = await response.json();
  return result
};



// Address



export async function fetchAddresses(token: string) {
  const res = await fetch(`https://ecom-testing.up.railway.app/address`, {
    headers: { Authorization: `Token ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch addresses');
  return res.json();
}

// Function/addAddress.ts

export async function addAddress(token: string, body: {
  fullName: string;
  phone: string;
  pincode: string;
  state: string;
  city: string;
  addressLine: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Failed to add address');
  return res.json();
}

export async function updateAddress(token: string, id: number, body: object): Promise<any> {
  const res = await fetch(`https://ecom-testing.up.railway.app/address/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Failed to update address');
  return res.json();
}


export async function deleteAddress(token: string, id: number): Promise<void> {
  const res = await fetch(`https://ecom-testing.up.railway.app/address/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Token ${token}` },
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    console.error("Delete failed:", res.status, data);
    throw new Error(data?.message || 'Failed to delete address');
  }
}
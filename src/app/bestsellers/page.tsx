import { Product } from "../../../types/product";
import ProductCard from "../components/productCard.tsx/ProductCard";


export default async function BestsellersPage() {
  let products: Product[] = [];

  try {
    const res = await fetch('https://ecom-testing.up.railway.app/product?page=1&limit=100', {
      cache: 'no-store',
    });

    const data = await res.json();

    products = data.data.filter((product: Product) =>
      product.tags?.includes('bestseller')
    );
  } catch (error) {
    console.error('Failed to fetch bestsellers:', error);
  }

  return (
    <div className="min-h-screen py-10 ">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-5 text-gray-800">🔥 Best Sellers</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No best sellers found.</div>
      )}
    </div>
  );
}

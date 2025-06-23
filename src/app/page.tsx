import React from "react";
import Banner from "./components/banner/Banner";
import { fetchBanners, fetchProducts, } from "./function/function";
import Categories from "./categories/Categories";
import ProductsPage from "./products/page";
import TrendingProducts from "./components/trendingProduct/TrendingProducts";
import RestaurantIntro from "./components/restrauntIntro/RestaurantIntro";



export default async function Home() {
  const banners = await fetchBanners();
  const products = await fetchProducts(1, 20)

  return (
    <div>
      <Banner banners={banners} />
      <Categories></Categories>
      <ProductsPage />
      <RestaurantIntro/>
      <TrendingProducts products={products} />
    </div>
  );
}

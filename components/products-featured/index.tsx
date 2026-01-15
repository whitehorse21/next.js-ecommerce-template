'use client';

import { useEffect, useState } from 'react';
import ProductsCarousel from './carousel';
import { ProductTypeList } from 'types';

const ProductsFeatured = () => {
  const [products, setProducts] = useState<ProductTypeList[] | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set empty array on error to prevent infinite loading state
        setProducts([]);
      }
    };
    fetcher();
  }, []);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  )
};

export default ProductsFeatured
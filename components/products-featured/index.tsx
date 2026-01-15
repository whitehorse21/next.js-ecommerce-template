import { useEffect, useState } from 'react';
import ProductsCarousel from './carousel';

const ProductsFeatured = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
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
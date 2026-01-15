import { GetServerSideProps } from 'next'

import { useState } from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
//import ProductsFeatured from '../../components/products-featured';
import Gallery from '../../components/product-single/gallery';
import Content from '../../components/product-single/content';
import Description from '../../components/product-single/description';
import Reviews from '../../components/product-single/reviews';

// types
import { ProductType } from 'types';

type ProductPageType = {
  product: ProductType;
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const pid = query.pid;
  
  try {
    // Use local API when running on server-side (getServerSideProps)
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    const apiUrl = `${protocol}://${host}/api/product/${pid}`;
    
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    
    const product = await res.json();
    
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback: try to get product from local data
    const products = await import('../../utils/data/products');
    const foundProduct = products.default.find((x) => x.id === pid);
    
    if (!foundProduct) {
      return {
        notFound: true,
      };
    }
    
    // Transform the product data to match ProductType
    const product: ProductType = {
      id: foundProduct.id,
      name: foundProduct.name,
      thumb: foundProduct.images?.[0] || '',
      price: String(foundProduct.price),
      count: foundProduct.quantityAvailable || 0,
      color: foundProduct.colors?.[0] || '',
      size: foundProduct.sizes?.[0] || '',
      images: foundProduct.images || [],
      discount: foundProduct.discount ? String(foundProduct.discount) : undefined,
      currentPrice: foundProduct.currentPrice || foundProduct.price,
      punctuation: foundProduct.punctuation,
      reviews: foundProduct.reviews || [],
    };
    
    return {
      props: {
        product,
      },
    };
  }
}

const Product = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState('description');

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button type="button" onClick={() => setShowBlock('description')} className={`btn btn--rounded ${showBlock === 'description' ? 'btn--active' : ''}`}>Description</button>
              <button type="button" onClick={() => setShowBlock('reviews')} className={`btn btn--rounded ${showBlock === 'reviews' ? 'btn--active' : ''}`}>Reviews (2)</button>
            </div>

            <Description show={showBlock === 'description'} />
            <Reviews product={product} show={showBlock === 'reviews'} />
          </div>
        </div>
      </section>

{
  /*
    <div className="product-single-page">
        <ProductsFeatured />
      </div>
  */
}
      <Footer />
    </Layout>
  );
}

export default Product

"use client";

import ProductItem from "./../../product-item";
import { ProductTypeList } from "types";

// import Swiper core and required components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";

type ProductsCarouselType = {
  products: ProductTypeList[] | null;
};

const ProductsCarousel = ({ products }: ProductsCarouselType) => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [centeredSlides, setCenteredSlides] = useState(false);
  const [spaceBetween, setSpaceBetween] = useState(30);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  function updateWindowSize() {
    if (typeof window === "undefined") return;
    console.log(window.innerWidth);

    // Big screen/Desktop: 3 cards (1024px and up)
    if (window.innerWidth >= 1024) {
      setSlidesPerView(3);
      setSpaceBetween(30);
      setCenteredSlides(false);

      return;
    }

    // Tablet: 2 cards (768px and up)
    if (window.innerWidth >= 768) {
      setSlidesPerView(2);
      setSpaceBetween(20);
      setCenteredSlides(false);

      return;
    }

    // Mobile: 1 card
    setSlidesPerView(1);
    setSpaceBetween(10);
    setCenteredSlides(false);
  }

  if (!products) return <div>Loading</div>;

  return (
    <div className="products-carousel">
      <Swiper
        spaceBetween={spaceBetween}
        loop={true}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        modules={[Pagination]}
        direction="horizontal"
        speed={600}
        freeMode={false}
        grabCursor={true}
        mousewheel={{
          forceToAxis: true,
        }}
        keyboard={{
          enabled: true,
        }}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              color={item.color}
              discount={item.discount}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;

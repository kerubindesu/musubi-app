import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCarousels } from '../../features/carousels/carouselsSlice';
import { Carousel } from 'flowbite-react';
import { Placeholder } from '../../components/atoms';
import { getCategories } from '../../features/categories/categoriesSlice';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductGrid } from '../../components/organism';
import { getProducts } from '../../features/products/productsSlice';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const dispatch = useDispatch()

  const [productsLimit, setProductsLimit] = useState(12);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { carousels, isLoading: isCarouselLoading } = useSelector((state) => state.carousels);
  const { categories, isLoading: isCategoryLoading, noFoundCategory } = useSelector((state) => state.categories);

  const { 
      products, 
      totalRowsProducts, 
      noFoundProduct,
      isLoading: isProductsLoading
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCarousels({ search: "", page: "", limit: "" }))
    dispatch(getCategories({ search: "", page: "", limit: "" }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getProducts({ search: "", page: "", limit: productsLimit, dispatch }));
  }, [productsLimit, dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
        setHasMoreProducts(products.length < totalRowsProducts);
    }
  }, [products, totalRowsProducts]);

    const fetchMoreData = () => {
    if (productsLimit < totalRowsProducts) {
        setProductsLimit(productsLimit + 12);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Helmet>
        <title>Durian Pak Jayus</title>
      </Helmet>
      <div className="container mx-auto">
        {isCarouselLoading ? (
          <Placeholder variant={"h-56 sm:h-64 md:h-80 xl:h-[28rem] w-full rounded-lg"} />
        ) : (
          <div className="aboslute inset-0 h-56 sm:h-64 md:h-80 xl:h-[28rem]">
            <Carousel leftControl={true} rightControl={true}>
              {carousels?.map((carousel, index) => (
                  <img key={index + 1} src={carousel.img_url} alt={carousel?.image} className="h-full w-full object-cover"/>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <div className="container mx-auto mt-6 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center gap-4 text-slate-900">
          <div>
            <span className="text-xl sm:text-2xl font-semibold">Kategori</span>
          </div>
          <div className="-mr-1 w-max flex items-center">
            <Link to={"/categories"} className="text-base">Lihat Semua</Link>
            <RiArrowRightSLine className="text-lg" />
          </div>
        </div>

        <div className="w-full flex justify-start items-center gap-4 overflow-x-scroll no-scrollbar box-border">
          {isCategoryLoading ? (
            <>
              <Placeholder variant={"h-[6rem] sm:h-[8rem] lg:h-[10rem] min-w-[12rem] sm:w-full rounded"} />
              <Placeholder variant={"h-[6rem] sm:h-[8rem] lg:h-[10rem] min-w-[12rem] sm:w-full rounded"} />
              <Placeholder variant={"h-[6rem] sm:h-[8rem] lg:h-[10rem] min-w-[12rem] sm:w-full rounded"} />
              <Placeholder variant={"h-[6rem] sm:h-[8rem] lg:h-[10rem] min-w-[12rem] sm:w-full rounded"} />
            </>
          ) : categories ? (
            <>
              {categories?.map((category, index) => (
                <Link
                  to={"/categories"}
                  onClick={() => {
                    localStorage.setItem("categoryId", category?._id || "");
                  }}
                  key={index + 1}
                  className="relative h-[6rem] sm:h-[8rem] lg:h-[10rem] min-w-[12rem] sm:w-full border rounded cursor-pointer">
                  <div className="absolute inset-0">
                    <img className="h-full w-full object-cover rounded" src={category?.img_url} alt={category?.image} />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end items-center">
                    <span className="p-2 w-full bg-gradient-to-t from-black/50 rounded-b text-base text-center text-white font-semibold textShadow truncate">{category?.name}</span>
                  </div>
                </Link>
              ))}
            </>
          ) : noFoundCategory && (
            <>{noFoundCategory}</>
          )}
          
        </div>
      </div>
    
      <div className="my-6 flex flex-col gap-4">
        <div className="container mx-auto text-slate-900">
            <h1 className="text-xl sm:text-2xl font-semibold">Produk</h1>
        </div>
        {noFoundProduct ? (
          // Menampilkan pesan jika tidak ada productingan
          <div className="col-span-full text-center">{noFoundProduct}</div>
        ) : (
          <InfiniteScroll
            dataLength={products?.length}
            next={fetchMoreData}
            hasMore={hasMoreProducts}
          >
            <ProductGrid products={products} isProductsLoading={isProductsLoading} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default Home
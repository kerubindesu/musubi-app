import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../../features/products/productsSlice';
import { Placeholder } from '../../components/atoms';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductGrid } from '../../components/organism';
import { RiArrowLeftSLine, RiWhatsappLine } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import NotFound from '../NotFound';
import { getWhatsappNumber } from '../../features/contact/contactSlice';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const productSlug = useParams().slug

  const [productsLimit, setProductsLimit] = useState(12);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { 
    productBySlug,
    products,
    totalRowsProducts, 
    noFoundProduct,
    isProductBySlugLoading,
    isLoading: isProductsLoading,
    isProductBySlugError
  } = useSelector((state) => state.products)

  const { 
    whatsappNumber,
  } = useSelector((state) => state.contact)

  const createWhatsAppLink = (number, message) => {
    const baseUrl = "https://wa.me/";
    const formattedNumber = number.replace('+', ''); // Menghilangkan tanda '+'
    const urlEncodedText = encodeURIComponent(message); // Encode teks pesan
    return `${baseUrl}${formattedNumber}?text=${urlEncodedText}`;
  };

  useEffect(() => {
    dispatch(getProductBySlug({ slug: productSlug, dispatch }))
    dispatch(getWhatsappNumber())
  }, [productSlug, dispatch])

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
    <div className="py-4 flex flex-col gap-4">
      <Helmet>
        <title>{productBySlug?.title || ""}</title>
      </Helmet>
      
      <Link to={-1} className="container mx-auto flex items-center">
        <RiArrowLeftSLine className="-ml-1.5 text-2xl" />
        <span className="text-lg font-semibold text-slate-900">Detail Produk</span>
      </Link>

      {isProductBySlugLoading ? (
        <div className="container md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="md:mx-0 col-span-1 md:col-span-2 lg:col-span-1">
            <Placeholder variant={"aspect-square w-full h-auto rounded-none md:rounded"} />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-4">
            <Placeholder variant={"h-8 w-[12rem] rounded-lg"} />
            <Placeholder variant={"h-8 w-full rounded-lg"} />
            <Placeholder variant={"h-8 w-full rounded-lg"} />
            <Placeholder variant={"h-8 w-[12rem] rounded-lg"} />
            <Placeholder variant={"h-8 w-full rounded-lg"} />
            <Placeholder variant={"h-8 w-10/12 rounded-lg"} />
            <Placeholder variant={"h-8 w-3/4 rounded-lg"} />
          </div>
        </div>
      ) : isProductBySlugError ? (
        <NotFound />
      ) : (
        <div className="container mx-auto grid grid-cols-1 sm:col-span-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="-mx-3 md:mx-auto col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <img className="aspect-square w-full h-auto border object-cover rounded-none md:rounded" src={productBySlug?.img_url} alt={productBySlug?.image} />
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-2 flex flex-col gap-6">
            <div className="container mx-auto">
              <h1 className="text-2xl font-semibold text-slate-900">{productBySlug?.title}</h1>
            </div>

            <div className="container mx-auto flex flex-col gap-4">
              <div className="w-full flex gap-2">
                <div className="w-32 truncate text-sm font-semibold text-slate-500">Kategori</div>
                <div className="w-full text-sm">{productBySlug?.category?.name}</div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-32 truncate text-sm font-semibold text-slate-500">Karakter</div>
                <div className="w-full text-sm flex flex-wrap justify-start items-center gap-1">
                  {productBySlug?.tags?.map((tag, index) => (
                    <div key={index} className="px-2 bg-slate-100 border rounded shadow-sm">
                      {tag?.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="container mx-auto">
              <span className="text-base font-semibold">Deskripsi</span>
              <p className="py-2 text-base text-start">{productBySlug?.description}</p>
            </div>

            <Link
              to={whatsappNumber ? createWhatsAppLink(whatsappNumber?.whatsapp_number, `Halo, saya tertarik dengan ${productBySlug?.title}!`): "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="container mx-auto"
            >
              <div className="py-2 px-4 w-max flex justify-start items-center gap-2 bg-emerald-400 shadow hover:shadow-none rounded border">
                <RiWhatsappLine className="text-xl text-white" />
                <span className="text-base text-white font-semibold">WhatsApp</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      
      <div className="my-6 flex flex-col gap-4">
        <div className="container mx-auto text-slate-900">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center">Produk Lainnya</h1>
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

export default ProductDetail
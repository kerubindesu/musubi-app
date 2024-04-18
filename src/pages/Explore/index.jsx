import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/products/productsSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InputSearch } from '../../components/atoms';
import { ProductGrid } from '../../components/organism';
import { Helmet } from 'react-helmet-async';

const Explore = () => {
    const dispatch = useDispatch();

    const [productsLimit, setProductsLimit] = useState(12);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [keyword, setKeyword] = useState("")

    const { 
        products, 
        totalRowsProducts, 
        noFoundProduct,
        isLoading 
    } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts({ search: keyword, page: "", limit: productsLimit, dispatch }));
    }, [productsLimit, dispatch, keyword]);

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
                <title>Jelajahi | Durian Pak Jayus</title>
            </Helmet>

            <div className="container mx-auto flex justify-between items-center gap-5 text-slate-900">
                <div className="w-max">
                    <h1 className="text-2xl font-semibold flex items-center">Eksplor</h1>
                </div>
                <InputSearch 
                    variant={"max-w-lg overflow-hidden"}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={"Ketikan seuatu..."}
                />
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
                <ProductGrid products={products} isProductsLoading={isLoading} />
            </InfiniteScroll>
            )}
        </div>
    )
}

export default Explore
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategory, getProductsByCategory } from "../../features/categories/categoriesSlice";
import { Placeholder } from "../../components/atoms";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductGrid } from "../../components/organism";
import { Helmet } from "react-helmet-async";
import { CategoryHeader } from "../../components/molecules";

const Category = () => {
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState(null);
  const [productsLimit, setProductsLimit] = useState(12);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const { 
    categories, 
    category, 
    products, 
    totalRowsProducts, 
    noFoundProduct, 
    isLoading: isCategoriesLoading, 
    isCategoryLoading, 
    isProductsLoading 
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories({ search: "", limit: "", page: ""}));
  }, [dispatch]);

  useEffect(() => {
    const storedCategoryId = localStorage.getItem("categoryId");
    if (!storedCategoryId && categories.length > 0) {
      setCategoryId(categories[0]?._id || "");
      localStorage.setItem("categoryId", categories[0]?._id || "");
    } else {
      setCategoryId(storedCategoryId);
    }
  }, [categories]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategory({ id: categoryId, dispatch }));
      dispatch(getProductsByCategory({ id: categoryId, search: "", page: "", limit: productsLimit, dispatch }));
    }
  }, [categoryId, productsLimit, dispatch]);
  
  // Atur ulang productsLimit ketika categoryId berubah
  useEffect(() => {
    setProductsLimit(12); // Atur kembali productsLimit ke nilai awal
  }, [categoryId]);
  
  // Fungsi untuk menghapus categoryId dari localStorage setelah 2 menit
  useEffect(() => {
    const categoryIdTimeout = setTimeout(() => {
      localStorage.removeItem("categoryId");
    }, 60000);
    
    // Membersihkan timeout saat komponen di-unmount
    return () => clearTimeout(categoryIdTimeout);
  }, [categoryId]);

  useEffect(() => {
    if (products && products?.length > 0) {
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
        <title>Kategori { category ? `- ${category.name}` : "" }</title>
      </Helmet>
      <CategoryHeader
        isCategoriesLoading={isCategoriesLoading}
        isCategoryLoading={isCategoryLoading}
        categories={categories}
        category={category}
        setCategoryId={setCategoryId}
      />

      {isCategoryLoading ? (
        <div className="container mx-auto flex flex-col gap-4">
          <Placeholder variant={"h-8 w-56 rounded-lg"} />
          <Placeholder variant={"h-4 w-full rounded-lg"} />
          <Placeholder variant={"h-4 w-full rounded-lg"} />
          <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
        </div>
      ) : (
        <div className="container mx-auto flex flex-col gap-2">
          <div className="text-2xl font-semibold">{category?.name}</div>
          <div className="text-base text-start">{category?.description}</div>
        </div>
      )}

      <div className="my-6 flex flex-col gap-4">
        <div className="container mx-auto text-slate-900">
          {isCategoryLoading ?
          (
            <Placeholder variant={"my-6 h-8 w-56 rounded-lg"} />
          ) : (
            <h1 className="text-2xl font-semibold">Produk Terkait</h1>
          )}
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
  );
};

export default Category;

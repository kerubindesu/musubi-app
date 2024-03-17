import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategory, getPostsByCategory } from "../../features/categories/categoriesSlice";
import { Placeholder, PostGrid } from "../../components/atoms";
import CategoryHeader from "../../components/atoms/CategoryHeader";
import InfiniteScroll from "react-infinite-scroll-component";

const Category = () => {
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState(null);
  const [postsLimit, setPostsLimit] = useState(12);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { 
    categories, 
    category, 
    posts, 
    totalRowsPosts, 
    noFoundPost, 
    loading: isCategoriesLoading, 
    isCategoryLoading, 
    isPostsLoading 
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
      dispatch(getPostsByCategory({ id: categoryId, search: "", page: "", limit: postsLimit, dispatch }));
    }
  }, [categoryId, postsLimit, dispatch]);
  
  // Atur ulang postsLimit ketika categoryId berubah
  useEffect(() => {
    setPostsLimit(12); // Atur kembali postsLimit ke nilai awal
  }, [categoryId]);
  
  // Fungsi untuk menghapus categoryId dari localStorage setelah 2 menit
  useEffect(() => {
    const categoryIdTimeout = setTimeout(() => {
      localStorage.removeItem("categoryId");
    }, 120000);
    
    // Membersihkan timeout saat komponen di-unmount
    return () => clearTimeout(categoryIdTimeout);
  }, []);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setHasMorePosts(posts.length < totalRowsPosts);
    }
  }, [posts, totalRowsPosts]);

  const fetchMoreData = () => {
    if (postsLimit < totalRowsPosts) {
      setPostsLimit(postsLimit + 12);
    }
  };

  return (
    <>
      <CategoryHeader
        isCategoriesLoading={isCategoriesLoading}
        isCategoryLoading={isCategoryLoading}
        categories={categories}
        category={category}
        setCategoryId={setCategoryId}
      />

      {isCategoryLoading ? (
        <>
          <Placeholder variant={"my-4 h-14 w-56 rounded-xl"} />
          <Placeholder variant={"my-2 h-10 w-full rounded-xl"} />
          <Placeholder variant={"my-2 h-10 w-11/12 rounded-xl"} />
        </>
      ) : (
        <div className="my-5 py-5 flex flex-col gap-2">
          <div className="text-2xl font-semibold">{category?.name}</div>
          <div className="text-base text-start">{category?.text}</div>
        </div>
      )}

      <div className="my-10">
        <div className="py-4 text-slate-900">
          <div className="container mx-auto">
            {isCategoryLoading ? <Placeholder variant={"my-6 h-14 w-56 rounded-xl"} /> : (
              <h1 className="text-2xl font-semibold flex items-center">Produk Terkait</h1>
            )}
          </div>
        </div>
        {posts && posts.length > 0 ? (
          <InfiniteScroll
            dataLength={posts?.length}
            next={fetchMoreData}
            hasMore={hasMorePosts}
          >
              <PostGrid noFoundPost={noFoundPost} posts={posts} isPostsLoading={isPostsLoading} />
            
          </InfiniteScroll>
        ) : (
          // Menampilkan pesan jika tidak ada postingan
          <div className="col-span-full text-center">{noFoundPost}</div>
        )}
      </div>
    </>
  );
};

export default Category;

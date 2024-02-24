import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories, getCategory, getPostsByCategory } from "../../features/categories/categoriesSlice"
import { Placeholder } from "../../components/atoms"
import { RiArrowRightSFill } from "react-icons/ri"

const Category = () => {
  const dispatch = useDispatch()

  const [categoryId, setCategoryId] = useState(null)
  const { 
    categories, 
    category, 
    posts, 
    noFoundPost, 
    loading: isCategoriesLoading, 
    isCategoryLoading, 
    isPostsLoading 
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories({ search: "", limit: "", page: ""}))
  }, [dispatch])

  useEffect(() => {
    if (!localStorage.getItem("categoryId")) {
      // Jika categoryId tidak ada di localStorage, ambil dari kategori index pertama
      if (categories && categories.length > 0) {
        setCategoryId(categories[0]?._id || "");
        localStorage.setItem("categoryId", categories[0]?._id || "");
      }
    } else {
      // Jika categoryId ada di localStorage, ambil dari localStorage
      setCategoryId(localStorage.getItem("categoryId"));
    }
  }, [categories])

  useEffect(() => {
    categoryId && dispatch(getCategory({ id: categoryId, dispatch }))
    categoryId && dispatch(getPostsByCategory({ id: categoryId, search: "", page: "", limit: "", dispatch }))
  }, [categoryId, dispatch])

  return (
    <>
      <div className="relative w-full rounded-xl">
        <div className="absolute inset-0 p-2 sm:p-6 flex sm:flex-col justify-between items-center lg:items-end rounded-lg overflow-hidden">

          <div className="h-full w-full lg:flex items-center">
            {isCategoryLoading ? <Placeholder variant={"h-12 w-28 rounded-lg"} /> : (
              <span className="lg:py-6 lg:pr-6 text-2xl sm:text-4xl lg:text-6xl text-white font-semibold textShadow md:truncate">{category?.name}</span>
            )}
          </div>

          {isCategoriesLoading ? <Placeholder variant={"h-full sm:h-16 min-w-[9rem] sm:min-w-[34.5rem] rounded-xl z-10"} /> : (
            <div className="px-2 h-full sm:h-auto min-w-[9rem] sm:min-w-[34.5rem] flex flex-col sm:flex-row gap-6 sm:gap-0 justify-center items-start sm:items-center box-border bg-white shadow-lg rounded-lg z-10">
              { categories?.map((item, index) => (
                <div
                  onClick={() => {
                    setCategoryId(item._id || "");
                    localStorage.setItem("categoryId", item?._id || "");
                  }}
                  className={`sm:w-[9rem] text-sm truncate cursor-pointer text-center text-slate-700 hover:text-slate-900 font-semibold ${ item.name === category?.name ? "text-slate-900" : ""}`}
                  key={index + 1}
                >
                  <span className="relative mx-auto px-2 sm:py-4 h-full w-min flex flex-col justify-center items-center text-center">
                    <div className="flex justify-start items-center">
                      <RiArrowRightSFill className={`-ml-3.5 sm:hidden ${ item.name === category?.name ? "block" : "hidden" }`} />
                      <span>{item.name}</span>
                    </div>
                    <div className={`hidden sm:block absolute bottom-0 right-0 left-0 h-1 rounded-sm
                    ${ item.name === category?.name ? "bg-slate-900" : "" }`}></div>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {isCategoriesLoading || isCategoryLoading ? <Placeholder variant={"h-56 sm:h-64 md:h-80 xl:h-[28rem] w-full rounded-xl"} /> : (
          <figure className="h-56 sm:h-64 md:h-80 xl:h-[28rem] w-full rounded-xl">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={category?.img_url}
              alt={category?.image}
            />
          </figure>
        )}
      </div>

      {isCategoryLoading ? <Placeholder variant={"my-6 h-32 w-full rounded-xl"} /> : (
      <div className="my-3 py-3 flex flex-col gap-2">
        <div className="text-xl font-semibold">{category?.name}</div>
        <div className="text-base text-justify">{category?.text}</div>
      </div>
      )}

      <div className="App my-20">
        <header className="py-4 text-slate-900">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold flex items-center">{category?.name}</h1>
          </div>
        </header>
        <main>
          <div className="relative container mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isPostsLoading ? (
              <>
                <Placeholder variant={"aspect-w-16 h-56 rounded-lg"} />
                <Placeholder variant={"aspect-w-16 h-56 rounded-lg"} />
                <Placeholder variant={"aspect-w-16 h-56 rounded-lg"} />
                <Placeholder variant={"aspect-w-16 h-56 rounded-lg"} />
              </>
            ):(
              <>
                {noFoundPost && <div className="absolute top-0 right-0 left-0 py-4 w-full text-center">{noFoundPost}</div>}
                {posts?.map((item, index) => (
                  <div key={index + 1} className="rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg">
                      <img
                        className="object-cover rounded-lg"
                        src={item?.img_url}
                        alt={item?.image}
                      />
                      <div className="bg-gray-300"></div>
                    </div>
                    <div className="mt-4 pb-4">
                      <p className="text-lg font-semibold">{item?.name}</p>
                      <p className="text-gray-500 line-clamp-2">{item?.text}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* Tambahkan card lainnya sesuai kebutuhan */}
          </div>
        </main>
      </div>
    </>
  )
}

export default Category
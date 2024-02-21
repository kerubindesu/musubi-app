/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../../features/categories/categoriesSlice"
import { Placeholder } from "../../components/atoms"

const Category = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");

  const { categories, loading: loadingCategory } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories({ search: "", limit: "", page: ""}))
  }, [])

  useEffect(() => {
    if (categories) {
      setTitle(categories[0]?.name || "");
      setPreview(categories[0]?.img_url || "");
    }
  }, [categories])

  return (
    <>
      {loadingCategory ? <Placeholder variant={"h-56 sm:h-64 md:h-80 xl:h-[28rem] 2xl:h-[28rem] w-full rounded-xl"} /> : (
        <div className="relative w-full rounded-xl">
          <div className="absolute inset-0 p-2 sm:p-6 flex sm:flex-col justify-between items-center lg:items-end rounded-lg overflow-hidden">

            <div className="h-full w-full lg:flex items-center">
              <span className="lg:py-6 text-2xl sm:text-4xl lg:text-6xl text-white font-semibold textShadow md:truncate">{title}</span>
            </div>

            <div className="px-2 h-full sm:h-auto min-w-[9rem] sm:min-w-[34.5rem] flex flex-col sm:flex-row gap-6 sm:gap-0 justify-center items-start sm:items-center box-border bg-white shadow-lg rounded-lg">
              {categories?.map((category, index) => (
                <div
                  onClick={() => {
                    setTitle(category.name);
                    setPreview(category.img_url)
                  }}
                  className={`sm:w-[9rem] text-sm truncate cursor-pointer text-center text-slate-700 hover:text-slate-900 font-semibold ${title && title === category.name ? "text-slate-900" : ""}`}
                  key={index + 1}
                >
                  <span className="relative mx-auto px-2 sm:py-4 h-full w-min flex flex-col justify-center items-center text-center">
                    {category.name}
                    <div className={`hidden sm:block absolute bottom-0 right-0 left-0 h-1 rounded-sm
                    ${title && title === category.name ? "bg-slate-900" : "" }`}></div>
                  </span>
                </div>
              ))}
            </div>
          </div>
          {preview && (
            <figure className="h-56 sm:h-64 md:h-80 xl:h-[28rem] 2xl:h-[28rem] w-full rounded-xl">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={preview}
                alt={title}
              />
            </figure>
          )}
        </div>
      )}
    </>
  )
}

export default Category
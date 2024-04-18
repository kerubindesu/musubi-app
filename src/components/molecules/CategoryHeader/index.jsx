import React from 'react'
import Placeholder from '../../atoms/Placeholder'
import { RiArrowRightSFill } from 'react-icons/ri';

const CategoryHeader = ({ isCategoriesLoading, isCategoryLoading, categories, category, setCategoryId }) => {

  return (
      <div className="container mx-auto relative">
        <div className="absolute inset-0 py-2 sm:px-6 sm:py-6 flex sm:flex-col justify-between items-center lg:items-end rounded-lg overflow-hidden">
          <div className="h-full w-full lg:flex items-center">
            {isCategoryLoading ? <Placeholder variant={"h-12 w-28 rounded-lg"} /> : (
              <span className="lg:py-6 lg:pr-6 text-2xl sm:text-4xl lg:text-6xl text-white font-semibold textShadow md:truncate">{category?.name}</span>
            )}
          </div>

          {isCategoriesLoading ? (
            <Placeholder variant={"h-full sm:h-16 min-w-[9rem] sm:min-w-[34.5rem] rounded-lg z-10"} />
          ) : (
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
        {isCategoriesLoading || isCategoryLoading ? (
          <Placeholder variant={"-mx-3 sm:mx-0 h-56 sm:h-64 md:h-80 xl:h-[28rem] rounded-none rounded-none sm:rounded-lg"} />
        ) : (
          <figure className="-mx-3 sm:mx-0 h-56 sm:h-64 md:h-80 xl:h-[28rem] overflow-x-hidden rounded-none sm:rounded-lg">
            <img
              className="w-full h-full object-cover rounded-none"
              src={category?.img_url}
              alt={category?.image}
            />
          </figure>
        )}
      </div>
  )
}

export default CategoryHeader
import React from 'react'
import Placeholder from '../../atoms/Placeholder'
import { RiArrowRightSFill } from 'react-icons/ri';

const CategoryHeader = ({ isCategoriesLoading, isCategoryLoading, categories, category, setCategoryId }) => {

  return (
      <div className="container mx-auto relative">
        <div className="absolute inset-0 py-2 sm:px-6 sm:py-6 flex sm:flex-col justify-between items-center lg:items-end rounded-lg overflow-hidden">
          <div className="h-full w-full lg:flex items-center">
            {isCategoryLoading ? <Placeholder variant={"h-12 w-11/12 sm:w-3/4 rounded-lg"} /> : (
              <span className="lg:py-6 lg:pr-6 text-2xl sm:text-4xl lg:text-6xl text-white font-semibold textShadow md:truncate">{category?.name}</span>
            )}
          </div>

          {isCategoriesLoading ? (
            <Placeholder variant={"h-full sm:h-16 min-w-[9rem] sm:min-w-[32rem] rounded-lg z-10"} />
          ) : (
            <div className="px-4 h-full sm:h-16 min-w-[9rem] sm:min-w-[32rem] overflow-hidden flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-start sm:items-center bg-white shadow-lg rounded-lg z-10">
              { categories?.map((item, index) => (
                <div
                  onClick={() => {
                    setCategoryId(item._id || "");
                    localStorage.setItem("categoryId", item?._id || "");
                  }}
                  className={`h-full w-full sm:w-max sm:max-w-[8rem] text-sm cursor-pointer text-center text-slate-700 hover:text-slate-900 font-semibold ${ item.name === category?.name ? "text-slate-900" : ""}`}
                  key={index + 1}
                >
                  <div className="relative h-full flex w-full justify-center items-center gap-2">
                    <div className="w-full flex justify-start items-center">
                      <RiArrowRightSFill className={`-ml-3.5 sm:hidden ${ item.name === category?.name ? "flex" : "hidden" }`} />
                      <span className="w-full truncate text-start">{item.name}</span>
                    </div>
                    <div className="absolute inset-0 hidden md:flex flex-col justify-end items-center">
                      <div className={`hidden sm:block h-1 w-full rounded-sm ${ item.name === category?.name ? "bg-slate-900" : "bg-transparent" }`}></div>
                    </div>
                  </div>
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
import React from 'react'
import { Link } from 'react-router-dom'
import { Placeholder } from '../../atoms'

const ProductGrid = ({ products, isProductsLoading }) => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-6">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                    <Link to={`/product/${product?.slug}`} key={index + 1} className="relative flex flex-col w-full overflow-hidden rounded-t">
                        <img
                        className="aspect-square object-cover h-24 sm:h-40 w-full border rounded"
                        src={product?.img_url}
                        alt={product?.image}
                        />
                        <div className="absolute top-0 right-0 left-0 p-2 bg-gradient-to-b from-black/50 text-xs text-center text-white textShadow font-semibold truncate">{product?.category?.name}</div>
                        {/* Konten teks */}
                        <div className="h-14 sm:h-16 flex flex-col justify-between items-center text-center">
                            <div className="flex-1 w-full flex items-center">
                                <div className="w-full text-xs sm:text-base font-medium text-start line-clamp-2">{product?.title}</div>
                            </div>
                            <div className="w-full flex justify-start items-center gap-x-1 overflow-x-scroll no-scrollbar">
                                {product?.tags?.map((tag, index) => (
                                    <div key={index + 1} className="px-2 max-h-4 min-w-min text-xs border rounded-sm flex justify-center items-center truncate">{tag.name}</div>
                                ))}
                            </div>
                        </div>
                    </Link>
                    ))
                ) : isProductsLoading && (
                    <>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                        <div className="w-full rounded-lg flex flex-col gap-1">
                            <Placeholder variant={"aspect-square h-24 sm:h-40 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-full rounded-lg"} />
                            <Placeholder variant={"h-4 w-1/2 rounded-lg"} />
                            <div className="flex justify-start items-center gap-1">
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                                <Placeholder variant={"h-4 w-12 rounded"} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductGrid

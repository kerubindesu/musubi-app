import React from 'react'
import { Link } from 'react-router-dom'

const PostGrid = ({ noFoundPost, posts, isPostsLoading }) => {
  return (
    <div className="container mx-auto py-4">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
            {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                <Link to={`/product/${post._id}`} key={index + 1} className="relative flex flex-col w-full overflow-hidden">
                    <img
                    className="object-cover h-24 sm:h-40 w-full border rounded"
                    src={post?.img_url}
                    alt={post?.image}
                    />
                    <div className="absolute top-0 right-0 p-2 border-t border-r rounded-bl rounded-tr bg-black text-xs text-right text-white font-semibold line-clamp-2">{post?.category?.name}</div>
                    {/* Konten teks */}
                    <div className="h-14 sm:h-16 flex flex-col justify-between items-center text-center">
                        <div className="flex-1 w-full flex items-center">
                            <div className="w-full text-xs sm:text-base font-medium text-start line-clamp-2">{post?.title}</div>
                        </div>
                        <div className="w-full flex justify-start items-center gap-x-1 overflow-x-scroll no-scrollbar">
                            {post?.tags?.map((tag, index) => (
                                <div key={index + 1} className="px-2 max-h-4 min-w-min text-xs border rounded-sm flex justify-center items-center truncate">{tag.name}</div>
                            ))}
                        </div>
                    </div>
                </Link>
                ))
            ) : isPostsLoading && (
                <>
                    <div className="rounded-lg bg-gray-200 h-32 sm:h-48 w-full"></div>
                    <div className="rounded-lg bg-gray-200 h-32 sm:h-48 w-full"></div>
                    <div className="rounded-lg bg-gray-200 h-32 sm:h-48 w-full"></div>
                </>
            )}
        </div>
    </div>
  )
}

export default PostGrid

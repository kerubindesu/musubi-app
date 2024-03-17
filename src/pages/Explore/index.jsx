import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../features/posts/postsSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InputSearch, PostGrid } from '../../components/atoms';

const Explore = () => {
    const dispatch = useDispatch();

    const [postsLimit, setPostsLimit] = useState(12);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [keyword, setKeyword] = useState("")

    const { 
        posts, 
        totalRowsPosts, 
        noFoundPost,
        isPostsLoading 
    } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts({ search: keyword, page: "", limit: postsLimit, dispatch }));
    }, [postsLimit, dispatch, keyword]);

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
            <div className="">
                <div className="py-4 flex justify-between items-center gap-5 text-slate-900">
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
    )
}

export default Explore
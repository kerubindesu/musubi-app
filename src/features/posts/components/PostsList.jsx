import { useGetPostsQuery } from "../slices/postsSlice"
import Post from "./Post"

const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="py-1 px-2 bg-red-500/20 text-blue-500">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = posts

        const tableContent = ids?.length
            ? ids.map(postId => <Post key={postId} postId={postId} />)
            : null

        content = (
            <table className="table table--posts">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="">Stauts</th>
                        <th scope="col" className="">Created</th>
                        <th scope="col" className="">Updated</th>
                        <th scope="col" className="">Title</th>
                        <th scope="col" className="">Owner</th>
                        <th scope="col" className="">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default PostsList
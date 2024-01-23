import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from 'react-icons/ri'

import { useSelector } from 'react-redux'
import { selectPostById } from '../selectors/userSelectors'

const Post = ({ postId }) => {

    const post = useSelector(state => selectPostById(state, postId))

    const navigate = useNavigate()

    if (post) {
        const created = new Date(post.createdAt).toLocaleString('id-ID', { day: 'numeric', month: 'long' })

        const updated = new Date(post.updatedAt).toLocaleString('id-ID', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/posts/${postId}`)

        return (
            <tr className="">
                <td className="">
                    {post.completed
                        ? <span className="text-green-500">Completed</span>
                        : <span className="text-red-800">Open</span>
                    }
                </td>
                <td className="">{created}</td>
                <td className="">{updated}</td>
                <td className="">{post.title}</td>
                <td className="">{post.username}</td>

                <td className="">
                    <button
                        className=""
                        onClick={handleEdit}
                    >
                        <RiEditBoxLine />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Post
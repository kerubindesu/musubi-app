import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPosts } from '../../../postsSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'


const PostsList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundPost, posts, totalRows, totalPage, loading } = useSelector((state) => state.posts);

  useEffect(() => {
      dispatch(getPosts({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Post akan terhapus secara permanent!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deletePost({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
    setItems(
      posts &&
        posts.map((post, index) => {
          return {
            "#": page * limit + (index + 1),
            id: post._id,
            Title: post.title,
            Desc: post.text,
            Image: [post.img_url, post.image]
          };
        })
    );
  }, [posts, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Posts"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={loading}
        noFoundData={noFoundPost}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        totalRows={totalRows}
      />
      <ConfirmDeleteModal confirm={confirm} message={message} />
    </>
  )
}

export default PostsList
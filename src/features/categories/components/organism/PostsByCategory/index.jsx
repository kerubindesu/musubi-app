import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getPostsByCategory } from '../../../categoriesSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'

const PostsByCategory = ({ categoryId }) => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundPost, posts, totalRows, totalPage, loading } = useSelector((state) => state.categories);

  useEffect(() => {
      dispatch(getPostsByCategory({ id: categoryId, search: keyword, page, limit }))
  }, [dispatch, categoryId, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Category akan terhapus secara permanent!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();

    await dispatch(deleteCategory({ id, search: keyword, page, limit, dispatch }));
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
            Tags: post?.tags || [],
            Image: [post.img_url, post.image]
          };
        })
    );
  }, [posts, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Post"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={loading}
        noFoundData={noFoundPost}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        totalRows={totalRows}
        noAddData={true}
        noActions={true}
      />
      <ConfirmDeleteModal confirm={confirm} message={message} />
    </>
  )
}

export default PostsByCategory
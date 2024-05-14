import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTag, getTags } from '../../../tagsSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'

const TagList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundTag, tags, totalRows, totalPage, isLoading } = useSelector((state) => state.tags);

  useEffect(() => {
      dispatch(getTags({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Tag akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteTag({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
      setItems(
        tags &&
          tags.map((tag, index) => {
            return {
              "#": page * limit + (index + 1),
              id: tag._id,
              Name: tag.name,
            };
          })
      );
    }, [tags, page, limit]);

    return (
      <>
        <TableResponsive
          items={items}
          title={"Tag"}
          action={handleDelete}
          setKeyword={setKeyword}
          isLoading={isLoading}
          noFoundData={noFoundTag}
          page={page}
          pageSize={limit}
          totalPage={totalPage}
          setPage={setPage}
          totalRows={totalRows}
        />
        <ConfirmDeleteModal confirm={confirm} message={message} />
      </>
    )
}

export default TagList
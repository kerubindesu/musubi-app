import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategories } from '../../../categoriesSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'
import { Link } from 'react-router-dom'

const CategoryList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundCategory, categories, totalRows, totalPage, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
      dispatch(getCategories({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Category akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();

    await dispatch(deleteCategory({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
      setItems(
        categories &&
          categories.map((category, index) => {
            return {
              "#": page * limit + (index + 1),
              id: category._id,
              Name: <Link className="text-emerald-400" to={`view/${category._id}`}>{category.name}</Link>,
              Desc: category.description,
              Image: [category.img_url, category.image]
            };
          })
      );
    }, [categories, page, limit]);

    return (
      <>
        <TableResponsive
          items={items}
          title={"Category"}
          action={handleDelete}
          setKeyword={setKeyword}
          isLoading={isLoading}
          noFoundData={noFoundCategory}
          page={page}
          pageSize={limit}
          totalPage={totalPage}
          setPage={setPage}
          totalRows={totalRows}
          noAddData={true}
          noDelete={true}
        />
        <ConfirmDeleteModal confirm={confirm} message={message} />
      </>
    )
}

export default CategoryList
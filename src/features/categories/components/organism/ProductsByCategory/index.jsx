import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getProductsByCategory } from '../../../categoriesSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'

const ProductsByCategory = ({ categoryId }) => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundProduct, products, totalRowsProducts, totalProductsPage, isProductsLoading } = useSelector((state) => state.categories);

  useEffect(() => {
      dispatch(getProductsByCategory({ id: categoryId, search: keyword, page, limit, dispatch }))
  }, [dispatch, categoryId, limit, keyword, page])

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
      products &&
        products.map((product, index) => {
          return {
            "#": page * limit + (index + 1),
            id: product._id,
            Title: product.title,
            Desc: product.description,
            Tags: product?.tags || [],
            Image: [product.img_url, product.image]
          };
        })
    );
  }, [products, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Product"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={isProductsLoading}
        noFoundData={noFoundProduct}
        page={page}
        pageSize={limit}
        totalPage={totalProductsPage}
        setPage={setPage}
        totalRows={totalRowsProducts}
        noAddData={true}
        noActions={true}
      />
      <ConfirmDeleteModal confirm={confirm} message={message} />
    </>
  )
}

export default ProductsByCategory
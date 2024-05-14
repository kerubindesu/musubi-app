import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../../productsSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'


const ProductsList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("")

  const { noFoundProduct, products, totalRows, totalPage, isLoading } = useSelector((state) => state.products)

  useEffect(() => {
      dispatch(getProducts({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Product akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteProduct({ id, search: keyword, page, limit, dispatch }));
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
            Category: product?.category?.name,
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
        isLoading={isLoading}
        noFoundData={noFoundProduct}
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

export default ProductsList
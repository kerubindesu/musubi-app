import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSEOData, getAllSEOData } from '../../../seoDataSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'


const SEODataList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("")

  const { noFoundSEOData, seoData, totalRows, totalPage, isLoading } = useSelector((state) => state.seoData)

  useEffect(() => {
      dispatch(getAllSEOData({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Data SEO akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteSEOData({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
    setItems(
      seoData &&
        seoData.map((item, index) => {
          return {
            "#": page * limit + (index + 1),
            id: item._id,
            keyword: item.keyword,
            Desc: item.description
          };
        })
    );
  }, [seoData, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"SEO Data"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={isLoading}
        noFoundData={noFoundSEOData}
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

export default SEODataList
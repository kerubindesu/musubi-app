import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBanner, getBanners } from '../../../bannersSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'


const BannersList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundBanner, banners, totalRows, totalPage, loading } = useSelector((state) => state.banners);

  useEffect(() => {
      dispatch(getBanners({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Banner akan terhapus secara permanent!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteBanner({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
    setItems(
      banners &&
        banners.map((banner, index) => {
          return {
            "#": page * limit + (index + 1),
            id: banner._id,
            Title: banner.title,
            Desc: banner.text,
            Image: [banner.img_url, banner.image]
          };
        })
    );
  }, [banners, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Banners"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={loading}
        noFoundData={noFoundBanner}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        totalRows={totalRows}
        noAddData={true}
        noEdit={false}
        noDelete={true}
      />
      <ConfirmDeleteModal confirm={confirm} message={message} />
    </>
  )
}

export default BannersList
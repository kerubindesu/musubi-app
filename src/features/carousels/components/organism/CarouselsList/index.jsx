import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCarousel, getCarousels } from '../../../carouselsSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'


const CarouselsList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundCarousel, carousels, totalRows, totalPage, isLoading } = useSelector((state) => state.carousels);

  useEffect(() => {
      dispatch(getCarousels({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Carousel akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteCarousel({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
    setItems(
      carousels &&
        carousels.map((carousel, index) => {
          return {
            "#": page * limit + (index + 1),
            id: carousel._id,
            Title: carousel.title,
            Desc: carousel.description,
            Image: [carousel.img_url, carousel.image]
          };
        })
    );
  }, [carousels, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Carousels"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={isLoading}
        noFoundData={noFoundCarousel}
        page={page}
        pageSize={limit}
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

export default CarouselsList
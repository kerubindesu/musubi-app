import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMenu, getMenus } from '../../../menusSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'

const MenuList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundMenu, menus, totalRows, totalPage, loading } = useSelector((state) => state.menus);

  useEffect(() => {
      dispatch(getMenus({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `Menu akan terhapus secara permanent!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();
    await dispatch(deleteMenu(id));
    await dispatch(getMenus({ search: keyword, page, limit }));
    dispatch(setModal(false));
  };

  useEffect(() => {
      setItems(
        menus &&
          menus.map((menu, index) => {
            return {
              "#": page * limit + (index + 1),
              id: menu._id,
              Nama: menu.name,
              Tautan: menu.link,
              Ikon: menu.icon,
            };
          })
      );
    }, [menus, page, limit]);

    return (
      <>
        <TableResponsive
          items={items}
          title={"Menus"}
          action={handleDelete}
          setKeyword={setKeyword}
          isLoading={loading}
          noFoundData={noFoundMenu}
          page={page}
          totalPage={totalPage}
          setPage={setPage}
          totalRows={totalRows}
        />
        <ConfirmDeleteModal confirm={confirm} message={message} />
      </>
    )
}

export default MenuList
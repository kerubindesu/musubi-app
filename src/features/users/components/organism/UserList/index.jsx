import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../../usersSlice'
import { setModal } from '../../../../confirmDeleteModal/confirmDeleteModalSlice'
import { TableResponsive } from '../../../../../components/organism'
import { ConfirmDeleteModal } from '../../../../confirmDeleteModal/components/organism'

const UserList = () => {
  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10)
  const [keyword, setKeyword] = useState("")
  const [id, setId] = useState(null)
  const [message, setMessage] = useState("");

  const { noFoundUser, users, totalRows, totalPage, isLoading } = useSelector((state) => state.users);

  useEffect(() => {
      dispatch(getUsers({ search: keyword, page, limit }))
  }, [dispatch, limit, keyword, page])

  const handleDelete = async(id) => {
    await dispatch(setModal(true));
    setId(id);
    setMessage(
      `User akan terhapus secara permanen!`
    );
  };

  const confirm = async(e) => {
    e.preventDefault();

    await dispatch(deleteUser({ id, search: keyword, page, limit, dispatch }));
    dispatch(setModal(false));
  };

  useEffect(() => {
    setItems(
      users &&
        users.map((user, index) => {
          return {
            "#": page * limit + (index + 1),
            id: user._id,
            Username: user.username,
            Nama: user.name,
            Email: user.email,
          };
        })
    );
  }, [users, page, limit]);

  return (
    <>
      <TableResponsive
        items={items}
        title={"Users"}
        action={handleDelete}
        setKeyword={setKeyword}
        isLoading={isLoading}
        noFoundData={noFoundUser}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        totalRows={totalRows}
        noAddData={true}
        noEdit={true}
      />
      <ConfirmDeleteModal confirm={confirm} message={message} />
    </>
  )
}

export default UserList
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUsers } from "../../../features/users/usersSlice"
import { useDispatch, useSelector } from "react-redux"

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [items, setItems] = useState("");
  const [limit, setLimit] = useState(32);
  const [q, setQuery] = useState("");

  const { users, totalItems } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers({ limit, q }));
  }, [dispatch, limit, q]);

  useEffect(() => {
    setItems(users)
  }, [users]);

  const handleClick = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <>
    <button onClick={handleClick} className="p-2 border shadow-lg cursor-pointer">Click here!</button>
    {users &&
    users.map((user, index) => (
      <div key={index + 1}>
        <br />
        <div>Name: {user.name}</div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
        <br />
        <hr />
      </div>
    ))}
    </>
  )
}

export default AdminDashboard
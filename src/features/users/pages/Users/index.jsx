import React from 'react'
import { UserList } from '../../components'
import { HeadingTitle } from '../../../../components/atoms'

const Users = () => {
  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Users"} />
      <UserList />
    </div>
  )
}

export default Users
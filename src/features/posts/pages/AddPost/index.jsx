import React from 'react'
import AddForm from '../../components/AddForm'
import { HeadingTitle } from '../../../../components/atoms'

const AddPost = () => {
  return (
    <>
      <HeadingTitle
        text={"Add Post"}
        back={true} 
        variant={"mb-4"}
      />
      <AddForm />
    </>
  )
}

export default AddPost
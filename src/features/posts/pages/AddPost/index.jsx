import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { AddForm } from '../../components/organism'

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
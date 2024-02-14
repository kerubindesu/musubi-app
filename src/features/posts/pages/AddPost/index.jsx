import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { AddForm } from '../../components/organism'

const AddPost = () => {
  return (
    <>
      <HeadingTitle
        text={"Add Post"}
        back={true} 
        marginBottom={"mb-8"}
        variant={"text-2xl"}
      />
      <AddForm />
    </>
  )
}

export default AddPost
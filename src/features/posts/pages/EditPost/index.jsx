import React from 'react'
import EditForm from '../../components/EditForm'
import { HeadingTitle } from '../../../../components/atoms'

const EditPost = () => {
  return (
    <>
      <HeadingTitle
        text={"Edit Post"}
        back={true} 
        variant={"mb-4"}
      />
      <EditForm />
    </>
  )
}

export default EditPost
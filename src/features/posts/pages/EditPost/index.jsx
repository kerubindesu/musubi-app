import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'

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
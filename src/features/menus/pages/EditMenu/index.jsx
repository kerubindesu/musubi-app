import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'

const EditMenu = () => {
  return (
    <>
      <HeadingTitle
        text={"Edit Post"}
        back={true} 
        marginBottom={"mb-8"}
        variant={"text-2xl"}
      />
      <EditForm />
    </>
  )
}

export default EditMenu
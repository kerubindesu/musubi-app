import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { AddForm } from '../../components/organism'

const AddMenu = () => {
  return (
    <>
      <HeadingTitle
        text={"Add Menu"}
        back={true} 
        marginBottom={"mb-8"}
        variant={"text-2xl"}
      />
      <AddForm />
    </>
  )
}

export default AddMenu
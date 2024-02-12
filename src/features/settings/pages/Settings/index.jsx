import React from 'react'
import { SettingsForm } from '../../components/organism'
import { HeadingTitle } from '../../../../components/atoms'

const Settings = () => {
  return (
    <>
      <HeadingTitle text={Settings} />
      <SettingsForm />
    </>
  )
}

export default Settings
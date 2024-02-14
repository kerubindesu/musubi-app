import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { LogoSettingsForm } from '../../components/organism'

const LogoSettings = () => {
  return (
    <>
      <HeadingTitle variant={"text-2xl"} text={"Logo Settings"} />
      <LogoSettingsForm />
    </>
  )
}

export default LogoSettings
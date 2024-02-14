import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import LogoSettingsForm from '../../components/organism/LogoSettingsForm'

const LogoSettings = () => {
  return (
    <>
      <HeadingTitle text={"Settings"} />
      <div className="mt-4">
        <LogoSettingsForm />
      </div>
    </>
  )
}

export default LogoSettings
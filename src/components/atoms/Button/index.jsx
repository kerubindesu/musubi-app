import React from 'react'

const Button = ({type, variant, disabled, name}) => {
  return (
    <>
      <Button
        type={type}
        className={`${variant}`}
        disabled={disabled}
      >
        {name}
      </Button>
    </>
  )
}

export default Button
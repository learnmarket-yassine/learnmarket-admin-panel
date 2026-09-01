import React, { CSSProperties, ReactElement } from 'react'
import Loader from './Loader/Loader'

type ActionButtonProps = {
  onClick: () => void
  disabled?: boolean
  icon?: ReactElement
  isLoading?: boolean
  style?: CSSProperties
  className?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  icon,
  isLoading,
  style,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      className={`${className} align-center flex h-7 w-7 justify-center rounded-md border p-1`}
    >
      {isLoading ? <Loader width="20" height="15" /> : icon}
    </button>
  )
}

export default ActionButton

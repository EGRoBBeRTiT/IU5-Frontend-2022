import React from 'react'
import plus_icon from './icons/plus_icon.png'

const ButtondAdd = (props) => {
  const className = 'button-add'
  return (
    <div>
      <button
        className={className}
        onClick={() => {
          props.addInput()
        }}
      >
        <img src={plus_icon} height="100%" alt=''></img>
        Добавить задачу
      </button>
    </div>
  )
}

export default ButtondAdd

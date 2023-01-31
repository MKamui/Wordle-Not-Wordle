import React, {useContext} from 'react'
import {AppContext} from '../App'

const Key = ({keyVal, bigKey, disabled}) => {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext)
  const selectLetter = () => {
    if(keyVal === "ENTER"){
      onEnter()
    } else if (keyVal === "DELETE") {
      onDelete()
    } else {
      onSelectLetter(keyVal)
    }
  }

  return (
    <div className='w-6 h-12 md:w-12 md:h-20 m-1 rounded-xl grid items-center bg-black text-white cursor-pointer'
    id={bigKey ? "big" : disabled && "disabled"}
    onClick={selectLetter}
    >
      {keyVal}
    </div>
  )
}

export default Key
import {Button} from 'baseui/button'
import React, {useState} from 'react'

export default function GenreButton () {
 
  const [isActive, setIsActive] = useState(false)
  return (
    <Button
      $isActive={isActive}
      onClick={() => {
        setIsActive(!isActive)
      }}> It Is       
    </Button>
  )
}
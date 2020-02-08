import { Button } from 'baseui/button'
import React, { useState } from 'react'
import { style } from '@material-ui/system'

export default function GenreButton(props) {

  const [isActive, setIsActive] = useState(false)
  return (
    <Button
      overrides={{
        BaseButton: {
          style: ({ $theme }) => {
            return {
              outline: 'red',
              backgroundColor: 'darkblue'
            };
          }
        }
      }}
      $isActive={isActive}
      onClick={() => {
        setIsActive(!isActive)
      }}> {props.text}
    </Button >
  )
}
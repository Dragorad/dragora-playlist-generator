import { Button } from 'baseui/button'
import React, { useState } from 'react'
import { style } from '@material-ui/system'
import ToggleButton from '@material-ui/lab/ToggleButton'

export default function GenreButton(props) {

  const [isActive, setIsActive] = useState(false)
  return (
    <React.Fragment>


      <ToggleButton style={{height: '100%' }} >
        {props.text}
      </ToggleButton>
      {/* <Button
        overrides={{
          BaseButton: {
            style: ({ $theme }) => {
              return {
                outline: 'red',
                backgroundColor: '#3f51b5'
              };
            }
          }
        }}
        $isActive={isActive}
        onClick={() => {
          setIsActive(!isActive)
        }}> {props.text}
      </Button > */}
    </React.Fragment>)
}
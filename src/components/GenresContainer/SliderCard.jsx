import * as React from 'react'
import { Slider } from 'baseui/slider'
import { Card, StyledBody, StyledAction } from 'baseui/card'


export default function SliderCard(props) {
  const [value, setValue] = React.useState([60])
  return (
    <Card>
      <StyledBody>
        {props.text}
      </StyledBody>
      <StyledAction>
        <Slider
          value={value}
          onChange={({ value }) => value && setValue(value)}
        >
        </Slider>
      </StyledAction>
    </Card>
  )
}
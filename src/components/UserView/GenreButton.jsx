import React, { useState } from 'react'
// import { style, minWidth } from '@material-ui/system'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles, createMuiTheme, Button, Grid, Paper, darken, capitalize } from '@material-ui/core'
import { border } from '@material-ui/system'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { green, blue, red, blueGrey } from '@material-ui/core/colors';




const useStyles = makeStyles({
  root: {
    // width:'100%',
    height: '100%',
    padding: '4%',
    // minWidth: '6 px',
    // width: '3 px',
    '&:active': {
      backgroundColor: blue[600],
      // backgroundColor: darken 
    },
    '&$:hover': {
      backgroundColor: red[900]
    },
  },
  // checked: {},
  // hover: {},
  label: {
    color: 'red',
    padding: '4%',
    fontSize: '0.3 rem',
    // textTransform: 'uppercase',
    '&$:hover': {
      textTransform: 'lowercase'
    }
  },
})


let btnState = {
  genresArr:[],
  descriptorsArr:[]

} 

export function ButtonsGroupMultiple(props) {
  const [selected, setSelected] = React.useState(props.selected)
  const inputArr = props.inputArr
  const onButtonClick = name => (event) => {
    setSelected(!selected)
    // alert(genresArr.includes(name))
    
    const {genresArr, descriptorsArr} = btnState
    
    genresArr.includes(name) ?
      genresArr = genresArr.filter(elem => elem !== name)
      : genresArr.push(name)
    alert(genresArr)
  }
  const classes = useStyles()
  return (

    <Grid container alignItems='flex-start'
      justify='space-evenly'
      style={{ height: '20' }}
      spacing={1}>
      {/* <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting"> */}
      {inputArr.map((text, index) => (
        <Grid item xs={4} sm={props.sm} spacing={1}>
          <Paper elevation={1}>
            <GenreButton flexGrow={1}
              value={text}
              key={index} variant='outlined'
              onClick={onButtonClick(text)}
              text={text}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>


  )
}

export function GenreButton(props) {
  const btnName = props.text
  const classes = useStyles()
  return (
    <Button
      variant='outlined'
      color='red'
      selected={props.selected}
      size={'medium'}
      // name={name}
      fullWidth
      onClick={props.onClick}
      classNames={{
        root: classes.root,
        active: classes.active,
        hoover: classes.hover,
        label: classes.label,
        label: classes.hover
      }}
    >
      {props.text}
    </Button>
  )
}
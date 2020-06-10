import React, { useState } from 'react'
// import { style, minWidth } from '@material-ui/system'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles, createMuiTheme, Button, Grid, Paper, darken, capitalize } from '@material-ui/core'
import { border } from '@material-ui/system'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { green, blue, red, blueGrey } from '@material-ui/core/colors';



// const theme = createMuiTheme({
//   overrides: {
//     // body:{
//     //   fontSize: "0.4 rem"
//     // },

//     typography: {
//       button: {
//         fontSize: "0.4 rem"
//       }
//     },
//     MuiButton: {
//       root: {
//         fontSize: '0.3 rem',
//         minWidth: '3 px'
//       },
//       label: {
//         fontSize: '0.3 rem'
//       }
//     }
//   }
// })

const useStyles = makeStyles({
  root: {
    height: '100%',
    padding: '4%',
    // minWidth: '6 px',
    // width: '3 px',
    '&:active': {
      backgroundColor: blue[600],
      // backgroundColor: darken 
    },
    '&$:hover': {
      backgroundColor: blueGrey[50]
    },
  },
  checked: {},
  hover: {},
  label: {
    padding: '4%',
    fontSize: '0.3 rem',
    textTransform: 'uppercase',
    '&$:hover': {
      textTransform: 'lowercase'
    }
  },
})



export function ButtonsGroupMultiple(props) {

  const inputArr = props.inputArr
  const [selected, setSelected] = React.useState('false')


  const onButtonClick = name => (event, selected) => {
    event.preventDefault()
    setSelected(!selected)
    selected ? inputArr.push(name) : inputArr.filter(elem => elem !== name)
    alert(name)
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

  const [isActive, setIsActive] = useState(false)
  const classes = useStyles()
  return (
    <Button
      variant='outlined'
      size={'medium'}
      fullWidth
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
import React, { useState } from 'react'
// import { style, minWidth } from '@material-ui/system'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles, createMuiTheme, ThemeProvider, Typography, CssBaseline, Button } from '@material-ui/core'
import { border } from '@material-ui/system'


const theme = createMuiTheme({
  overrides: {
    // body:{
    //   fontSize: "0.4 rem"
    // },
    
    typography: {
      button: {
        fontSize: "0.4 rem"
      }
    },
    MuiButton: {
      root: {
        fontSize: '0.3 rem',
        minWidth: '3 px'
      },
      label: {
        fontSize: '0.3 rem'
      }
    }
  }
})

const useStyles = makeStyles({
  root: {
    height: '15 px',
    minWidth: '6 px',
    fontSize: '0.4 rem',
    width: '3 px'
  },
  label:{
    textTransform: 'uppercase'
  }
})

export default function GenreButton(props) {

  const [isActive, setIsActive] = useState(false)
  const classes = useStyles()
  return (
    <React.Fragment>

      <ThemeProvider theme={theme}>

<CssBaseline/>
        <Button 
        variant='outlined'
        fullWidth
        // style={{
        //   textTransform: "uppercase",
        //   fontSize: '0.6 rem',
        //   border: '1 px  solid black '

        // }}
          classes={{
            root: classes.root,
            label: classes.label
          }}
        >
          {/* <Typography
          fontSize='0.5 rem'
          > */}
            {props.text}

          {/* </Typography> */}
        </Button>
      </ThemeProvider>
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
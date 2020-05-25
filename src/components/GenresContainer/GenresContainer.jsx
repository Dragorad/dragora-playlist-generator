import { genresList } from '../../workers/genresList'
import React from 'react'
import { makeStyles, withStyles, styled } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
// import Grid from '@material-ui/core/Grid'
import { CreateMuiTheme } from '@material-ui/core/styles'
import GenreButton from './GenreButton'
import SliderCard from './SliderCard'
import { Grid} from 'baseui/layout-grid'

import BaseUiButtonGroup from './BaseUiButtonGroup.jsx'
import SliderMUI from './SliderMUI'
import SlidersForm from './SlidersForm'

// const theme = CreateMuiTheme =>({
//     palette: 
// })


const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5),
  },
}))


export default function CustomizedDividers() {
  const [alignment, setAlignment] = React.useState('left')
  const [formats, setFormats] = React.useState(() => ['italic'])

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
  }

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const classes = useStyles()

  return (
    <div>
      {/* <Paper elevation={0} className={classes.paper}>

             </Paper> */}

      <Paper elevation={2}>
        
         <SlidersForm />
      
      </Paper>

    </div >
  )
}

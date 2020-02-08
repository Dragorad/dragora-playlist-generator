
import { genresList } from '../../workers/genresList'
import React from 'react'
import { makeStyles, withStyles, styled } from '@material-ui/core/styles'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
// import Grid from '@material-ui/core/Grid'
import { CreateMuiTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import GenreButton from './GenreButton'
import SliderCard from './SliderCard'
import { Grid, Cell } from 'baseui/layout-grid'

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


// const DifferentToggleButton = withStyles => ({
//   root: {
//     color: 'green',
//     backgroundColor: 'yellow'
//   },
//   selected: {
//     color: 'red'
//   }
// })(ToggleButton)

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
      <Paper elevation={0} className={classes.paper}>

        <Divider orientation="vertical" className={classes.divider} />

      </Paper>

      <Paper elevation={2}>
        <ToggleButtonGroup>

          <Grid container spacing={1}
            gridGaps={4}>
            {genresList.map((text, index) => (<Cell
              // item sx={3} spacing={2} md={6}>
              span={1}>
              <GenreButton
                text={text}
                key={index}
              />
            </Cell>))}
          </Grid>

        </ToggleButtonGroup>
        <SliderCard
          text="Diversity" />
        <SliderCard
          text="RMS" />
      </Paper>
    </div >
  )
}

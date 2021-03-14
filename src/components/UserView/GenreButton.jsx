import React, {useContext } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper} from '@material-ui/core'
// import { border, color } from '@material-ui/system'
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {blueGrey} from '@material-ui/core/colors'
import { AppContext } from '../../stateContext/indexContext';
// import { StylesProvider } from '@material-ui/core'
import { descriptorsList } from '../../workers/descriptorsList'
// import { TOGGLE_BTN_STATE } from '../../stateContext/types'




const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    padding: '7%',
    '&:hover': {
      backgroundColor: blueGrey[200]
    },
    '&$selected': {
      backgroundColor: blueGrey[400],
      color: 'white'
    },

  },
  selected: {},
  // checked: {},
  // hover: {},
  label: {
    padding: '1%',
    // fontSize: '1 rem',
    // textTransform: 'uppercase',
    '&$:hover': {
      textTransform: 'lowercase'
    }
  },
})


export function ButtonsGroupMultiple(props) {

  // const {btnState} = appState
  // const {genresArr, descriptorsArr} = btnState
  const [appState, dispatch] = useContext(AppContext)
  // const [selected, setSelected] = React.useState(props.selected)
  const inputArr = props.inputArr

  const onButtonClick = name => (event) => {
    const arrName = descriptorsList.includes(name) ? 'descriptorsArr' : 'genresArr'
    // alert(arrName)
    const newArr = appState[arrName].includes(name) ?
      appState[arrName].filter(el => el !== name)
      : [...appState[arrName], name]
    console.log(newArr)
    dispatch({
      type: 'TOGGLE_BTN_STATE',
      payload: [arrName, newArr]
    })
  }
  const classes = useStyles()
  return (
    <Grid container alignItems='space-between'
      // alignItems='stretch'
      // justify='space-evenly'
      // style={{ height: '20' }}
      spacing={1}>
      {inputArr.map((text, index) => (
        <Grid item xs={4} sm={props.sm} spacing={1}>
          <Paper elevation={1}
            style={{ height: '100%' }}>
            <ToggleButton
              key={index}
              classes={{
                root: classes.root,
                selected: classes.selected,
                label: classes.label
              }}
              aria-label={props.text}
              value={text}
              text={text}
              variant='outlined'
              selected={appState.genresArr.includes(text) || appState.descriptorsArr.includes(text)}
              size={'medium'}
              // name={name}
              fullWidth
              onChange={onButtonClick(text)}
            >
              {text}
            </ToggleButton>
          </Paper>
        </Grid>
      ))}
      {/* </React.Fragment> */}
    </Grid>


  )
}


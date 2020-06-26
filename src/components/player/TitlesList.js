import React, { useContext, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function TitlesList(props) {
  const classes = useStyles()
  const [appState, dispatch] = useContext(AppContext)
console.log(appState)
  const setAppStateIdx = index => (e) => {
    e.preventDefault()
    dispatch({
      type: types.SET_URL_IDX,
      payload: index
    })
  }

  return (
    <div className={classes.root}>

      <List component="nav" aria-label="playlist titles">
        {props.dataArr.map((elem, index) => (
          <ListItem
            key={index}
            button
            selected={appState.urlIdx === index}
            onClick={setAppStateIdx(index)}
          >
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary={elem.artist}
              secondary={elem.titleName} />
            <Divider />
          </ListItem>
        ))}
      </List>
      {/* 
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={props.urlIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={props.urlIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List> */}
    </div>
  )
}

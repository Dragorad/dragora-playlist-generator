import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import PlayArrowIcon from '@material-ui/icons/PlayCircleOutline'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined'
import { AppContext } from '../../stateContext/indexContext'

import * as types from '../../stateContext/types'
import { Tooltip } from '@material-ui/core'
import { app } from '../../../src/index.js'

// const user = app.currentUser


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


  const addLikeAndFaforit = index => (e) => {
    e.preventDefault()
    const userId = appState.userId  
    const clientUserName = appState.userName
    const titleId = appState.playlist[index]._id.toString()
    const sendObj = {userId, titleId, clientUserName}
    console.log('adding to favorits and likes', sendObj)

    app.currentUser.callFunction('addToFavorits', sendObj)
  }
  const setAppStateIdx = index => (e) => {
    e.preventDefault()
    console.log(index)
    dispatch({
      type: types.SET_URL_IDX,
      payload: index
    })
  }

  return (
    <div className={classes.root}>

      <List component="nav" aria-label="playlist titles">
        {appState.playlist.map((elem, index) => (
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
            <ListItemIcon>
              <Tooltip title='Like this title' placement='top-start' arrow
                onClick = {addLikeAndFaforit(index)} >
                <ThumbUpAltOutlinedIcon />
              </Tooltip>
            </ListItemIcon>
           { appState.userName !== '' &&  <ListItemIcon>
              <Tooltip title='Add to personal favorits' placement='bottom' arrow >
                < FavoriteOutlinedIcon
                  onClick={addLikeAndFaforit(index)} />
              </Tooltip>
            </ListItemIcon>}
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

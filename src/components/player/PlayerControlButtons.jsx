import { IconButton } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { useState, useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import { notify } from 'react-notify-toast'




const useStyles = makeStyles({
    controls: {
        display: 'flex',
        alignItems: 'center',
        // paddingLeft: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
        backgroundImage: 'music-player-circle-start.svg'
    }
})

export default function PlayerControlButtons() {

    const [appState, dispatch] = useContext(AppContext)
    const classes = useStyles()
    //   const theme = useTheme()
    const [state, setState] = useState({
        playing: true,
        urlIndex: 0
    })
    const changeUrlIndex = direction => (event) => {
        const lastIdx = stateUrls.length - 1
        // const newIdx = 0
        switch (direction) {
            case 'up': {
                return dispatch({
                    type: types.SET_URL_IDX,
                    payload: appState.urlIdx < lastIdx ? appState.urlIdx + 1 : 0
                })
            }
            case 'down': {
                return dispatch({
                    type: types.SET_URL_IDX,
                    payload: appState.urlIdx > 0 ? appState.urlIdx - 1 : lastIdx
                })
            }

            default: notify.show("Tell me what to do", 'danger')
            // return setState({ ...state, urlIndex: direction })
        }
    }
    const handlePlayPause = e => {
        e.preventDefault()
        dispatch({
            type: types.TOGGLE_PLAY_PAUSE,
            payload: !appState.playing
        })
        setState({ ...state, playing: !state.playing })
    }
    if (!appState) return <p style={{backgroundImage:' url("music-player-circle-start.svg")'}}
    >Loading playlist...</p>
    console.log(appState)
    const playlistArr = appState.playlist

    const stateUrls = playlistArr.map(elem => `https://youtu.be/${elem.url}`)
    console.log(stateUrls[appState.urlIdx])

    return (
        <div className={classes.controls}  //control icons
        >
             <img src="music-player-circle-start.svg" alt='App Logo'
             className={classes.playIcon} />
            <IconButton aria-label="previous"
                onClick={changeUrlIndex('down')}>
                <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause"
                onClick={handlePlayPause}>
                {!appState.playing ?
                    // <img src="music-player-circle-start.svg" alt='App Logo' />
                    <PlayArrowIcon className={classes.playIcon} />
                    : <PauseIcon className={classes.playIcon} />
                }
            </IconButton>
            <IconButton aria-label="next"
                onClick={changeUrlIndex('up')}
            >
                <SkipNextIcon />
            </IconButton>
        </div>)
}

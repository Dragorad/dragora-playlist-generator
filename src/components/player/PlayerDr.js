import { useState, useContext } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import ReactPlayer from 'react-player/lazy'
import { notify } from 'react-notify-toast'
import { Container, Fade, Zoom } from '@material-ui/core'
import PlayerControlButtons from './PlayerControlButtons'

export default function PlayerDr(props) {
    // const queryMatches = useMediaQuery('(min-width: 600px)')

    const [appState, dispatch] = useContext(AppContext)
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
    // const handlePlayPause = e => {
    //     e.preventDefault()
    //     dispatch({
    //         type: types.TOGGLE_PLAY_PAUSE,
    //         payload: !appState.playing
    //     })
    //     setState({ ...state, playing: !state.playing })
    // }
    if (!appState) return <p>Loading playlist...</p>
    // console.log(appState)
    const playlistArr = appState.playlist

    const stateUrls = playlistArr.map(elem => `https://youtu.be/${elem.url}`)
    console.log(stateUrls[appState.urlIdx])

    return (
        <Container
            style={{ marginTop: '2%' }}>
            {appState.playlist.length < 1 ?
                <p variant={'h4'} color={"textSecondary"}>
                    Playlist is empty.<br />
          Please set "Diversity" to bigger value or add genres with dedicated buttons<br />
          Then press "Generate Playlist Button" </p>
                : <>
                    <Zoom in={true} style={{transitionDuration: '2800'}} >
                        <ReactPlayer
                            url={stateUrls[appState.urlIdx]}
                            playing={appState.playing}
                            playIcon={false}
                            controls={false}
                            width={'100%'}
                            light={false}
                            // height={'100%'}
                            onEnded={changeUrlIndex('up')} />
                    </Zoom>

                    <PlayerControlButtons />
                </>
            }
        </Container >
    )
}


import React, { useState, useReducer, useContext } from 'react'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import SliderMUI from './SliderMUI'
import {
    Button, Grid, Slider,
    Paper, Divider, makeStyles, Typography, Container
} from '@material-ui/core'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { descriptorsList } from '../../workers/descriptorsList'
import { GenreButton, ButtonsGroupMultiple } from './GenreButton'
import { flexbox, sizing } from '@material-ui/system'
import { grey } from '@material-ui/core/colors'
import { app, getNewPlayList } from '../../index'



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // color: 'red'
    },
    gridList: {
        width: 200,
        height: 100
    },
    paper: {
        padding: '2%',
        margin: 'auto'
    }
}))

// export const randomBpm = getRandomInt(85, 185)
// const randomDelta = getRandomInt(10, 50)
// console.log(`bpm: ${randomBpm}  delta: ${randomDelta}`)


// const generateRandomInput = () => ({
//     bpm: getRandomInt(85, 185),
//     delta: getRandomInt(10, 50)
// })

const stateObj = {
    randomInt: { min: 120, max: 180, step: 5, value: 180 },
    Brightness: { min: 0, max: 100, step: 5, value: 65 },
    Loudness: {
        min: 1, max: 100, step: 5, value: 45,
        valueLabelFormat: (x) => x + 60
    },
    Tempo: { min: 60, max: 180, step: 5, value: 40 },
    Diversity: { min: 10, max: 50, step: 10, value: 20 },
    diversityStrings: [],
    genresButtons: {}
}

export default function SlidersForm() {

    const [state, setState] = useState(stateObj)
    // console.log(state)
    const [appState, dispatch] = useContext(AppContext)

    const customInput = {
        bpm: state.Tempo.value + 70,
        delta: state.Diversity.value,
        average_loudness: state.Loudness.value,
        spectral_centroid: state.Brightness.value
    }
    const setNewPlaylist = customInput => {
        console.log(customInput)
        getNewPlayList(customInput)
            .then(playlist => {
                console.log(playlist)
                dispatch({
                    type: types.SET_NEW_PLAYLIST,
                    payload: playlist
                })
                dispatch({
                    type: types.SET_URL_IDX,
                    payload: 0
                })
                dispatch({
                    type: types.SET_PLAYING,
                    payload: true
                })
                console.log(appState.playlist)
            })
    }

    const onSliderChange = name => (ev, value) => {
        setState({ ...state, [name]: { ...state[name], value: value } })
        // setState({
        //     ...state, [name]: value
        // })
        // alert(state[name])
    }
    const handleCommit = name => (ev, value) => {
        setState({ ...state, [name]: { ...state[name], value: value } })

    }

    const handleSliderChange = name => (ev, value) => {
        ev.preventDefault()
        setState({
            ...state, [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setNewPlaylist(customInput)
        // .then (res => {console.log(res)})
        // console.log(appState.default)
    }

    const classes = useStyles()
    return (
        <form style={{ padding: '1rem', margin: 'auto' }}>
            <Grid container
                xs={12}
                // lg={8}
                // xl={6}
                spacing={1}
                direction={'row'}
                justify={'space-between'}
                alignItems={'center'}
            >
                <Grid xs={12} sm={3} //genres'
                    style={{ padding: '1%', margin: 'auto' }}
                    item container
                    spacing={3}
                    direction={'row'}
                    justify='center'
                    alignItems='flex-start' >
                    <ButtonsGroupMultiple sm={6} lg={3} inputArr={genresList}
                    selected={true}
                    />
                </Grid>

                <Grid item container xs={12} sm={9} //sliders and generate
                    direction='row'
                    alignItems={'baseline'}
                    spacing={1}
                    // style={{ height: '100%' }}
                    justify={'space-between'}>

                    <Grid item xs={12} sm={5}//descriptor sliders
                        container direction={'column'}
                        alignItems={'center'}
                        style={{ height: '30%' }}>
                        {descriptorsList.map((descriptor, key) => (
                            // <Grid item sx={8}>
                            < SliderMUI key={key}
                                value={state[descriptor].value}
                                defaultValue={state[descriptor].value}
                                min={state[descriptor].min}
                                max={state[descriptor].max}
                                step={state[descriptor].step}
                                aria-text={descriptor}
                                sliderText={descriptor}
                                name={descriptor}
                                onChange={onSliderChange(descriptor)}
                                onChangeComitted={handleCommit(descriptor)}
                                valueLabelFormat={descriptor === "Tempo" ?
                                    state.Tempo.valueLabelFormat : (x) => x = x}
                            />
                            // </Grid>
                        ))}

                        {/* <Divider variant='middle' /> */}
                        {/* </Paper> */}
                    </Grid>
                    {/* <Divider orientation='vertical' flexItem /> */}
                    <Grid item xs={12} sm={7} container //diversity
                        direction='column'
                        spacing={1}
                        style={{ borderTop: '1px solid #e5e6e8', paddingBottom: '20 px' }}

                        justify={'space-between'}
                        alignItems={'center'} >
                        <Container >
                            <Divider orientation='vertical' flexItem />
                            <SliderMUI item
                                //  height='10%'
                                sliderText='Diversity'
                                value={state.Diversity.value}
                                defaultValue={state.Diversity.value}
                                min={state.Diversity.min}
                                max={state.Diversity.max}
                                step={state.Diversity.step}
                                aria-text={'Diversity'}
                                name={'Diversity'}
                                onChange={onSliderChange('Diversity')}
                                onChangeComitted={handleCommit('Diversity')} />
                            <ButtonsGroupMultiple sm={4} inputArr={descriptorsList} selected={false} />

                            <Button size={'medium'}
                                variant="outlined"
                                onClick={onSubmit}
                                type='submit'
                                fullWidth >Generate Playlist</Button>

                        </Container>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

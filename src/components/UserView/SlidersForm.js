import { useState, useContext } from 'react'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import SliderMUI from './SliderMUI'
import { Button, Grid, makeStyles } from '@material-ui/core'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { descriptorsList } from '../../workers/descriptorsList'
import { ButtonsGroupMultiple } from './GenreButton'
import { blueGrey } from '@material-ui/core/colors'
import { getNewPlayList } from '../../index'
// import SnackBar from './SnackBar'
import Notifications, { notify } from 'react-notify-toast'
import { notifyOptions } from './notifyOptions'



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
    },
    buttonGroup: {
        marginBottom: 1

    }
}))

const stateObj = {
    randomInt: { min: 120, max: 180, step: 5, value: 180 },
    Brightness: { min: 0, max: 100, step: 5, value: 65 },
    Loudness: {
        min: 1, max: 100, step: 5, value: 20,
        valueLabelFormat: (x) => x + 60
    },
    Tempo: { min: 60, max: 180, step: 5, value: 10 },
    Diversity: { min: 10, max: 50, step: 10, value: 10 },
    diversityStrings: [],
    genresButtons: {}
}

export default function SlidersForm() {

    const [state, setState] = useState(stateObj)
    const [appState, dispatch] = useContext(AppContext)
    const includedGenres = appState.genresArr.join(' ').split(' ')
        .filter(el => el !== 'general' && el !== 'and')

    const customInput = {
        bpm: state.Tempo.value + 70,
        delta: state.Diversity.value,
        average_loudness: state.Loudness.value,
        spectral_centroid: state.Brightness.value,
        genresArr: includedGenres
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

        console.log(state[name])
        setState({ ...state, [name]: { ...state[name], value: value } })
    }
    const toggleAllGenres = e => {
        e.preventDefault()
        dispatch({
            type: types.SET_GENRES,
            payload: genresList
        })
    }
    const deselectAllGenres = e => {
        e.preventDefault()
        dispatch({
            type: types.SET_GENRES,
            payload: []
        })
    }
    // const handleSliderChange = name => (ev, value) => {
    //     ev.preventDefault()
    //     setState({
    //         ...state, [name]: value
    //     })
    // }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(customInput)
        !appState.genresArr.length ?
            notify.show('You have to select at last one genre button or select all genres', "error", 7000)
            : setNewPlaylist(customInput)
    }

    const classes = useStyles()
    return (
        <form style={{ padding: '1rem', margin: 'auto' }}>
            <Notifications
                options={notifyOptions} />
            <Grid container
                xs={12}
                lg={10}
                // xl={6}
                spacing={1}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'baseline'}
            >

                <Grid item sx={12} sm={3} // genres buttons
                    // style={{ border: '1px solid red' }}
                    direction='row'>
                    <Button style={{
                        margin: '2% 0',
                        backgroundColor: blueGrey[400],
                        color: 'white'
                    }}
                        onClick={toggleAllGenres}
                        fullWidth  > Select All Genres</Button>

                    <ButtonsGroupMultiple inputArr={genresList}
                        selected={true} sm={6}
                    />
                    <Button style={{ margin: '2% 0' }}
                        variant="outlined"
                        onClick={deselectAllGenres}
                        // type='submit'
                        fullWidth  > DeSelect All Genres</Button>

                </Grid>
                <Grid item container xs={12} sm={9} //sliders and generate
                    direction='row'
                    // alignItems={'baseline'}
                    spacing={1}
                // style={{ border: '1px solid red' }}
                // justify={'space-between'}
                >

                    <Grid item sm={7}//descriptor sliders
                        container direction={'column'}
                        // justifyContent={'st'}
                        // alignItems={'center'}
                        style={{ backgroundColor: 'none', height: '100%' }}>
                        {descriptorsList.map((descriptor, key) => (
                            <Grid item sm={12}>
                                < SliderMUI key={key}
                                    value={state[descriptor].value}
                                    defaultValue={state[descriptor].value}
                                    min={state[descriptor].min}
                                    max={state[descriptor].max}
                                    step={state[descriptor].step}
                                    // aria-text={descriptor}
                                    sliderText={descriptor}
                                    disabled={!appState.descriptorsArr.includes(descriptor)}
                                    name={descriptor}
                                    onChange={onSliderChange(descriptor)}
                                    onChangeComitted={handleCommit(descriptor)}
                                    valueLabelFormat={descriptor === "Tempo" ?
                                        state.Tempo.valueLabelFormat : (x) => x = x}
                                />
                            </Grid>
                        ))}

                        {/* <Divider variant='middle' /> */}
                        {/* </Paper> */}
                    </Grid>

                    {/* <Divider orienta4tion='horizontal' flexItem /> */}

                    <Grid container item sm={5} //diversity
                    // style={{ backgroundColor: blueGrey[200], height: '100%' }}
                    >
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


                        <ButtonsGroupMultiple sm={4} inputArr={descriptorsList} selected={false}
                            classes={classes.buttonGroup} />

                        <Button size={'medium'}
                            style={{ margin: '5% 0' }}
                            variant="outlined"
                            onClick={onSubmit}
                            type='submit'
                            fullWidth >Generate Playlist</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form >
    )
}

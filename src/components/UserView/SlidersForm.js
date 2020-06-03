import React, { useState } from 'react'
import SliderMUI from './SliderMUI'
import {
    Button, Grid, Slider,
    Paper, Divider, makeStyles, Typography
} from '@material-ui/core'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { descriptorsList } from '../../workers/descriptorsList'
import GenreButton from './GenreButton'
import { flexbox, sizing } from '@material-ui/system'
import { grey } from '@material-ui/core/colors'
import ContinousSlider from './SliderCopy'


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
    }
}))


export default function SlidersForm() {

    const [state, setState] = useState(
        {
            Brightness: 25,
            Loudness: 45,
            Tempo: 14,
            Diversity: 30,
            temp:13
        })
    // const [value, setValue] = React.useState(30);

    const handleChange = name => (event, newValue) => {
        setState({ ...state, [name]: newValue })
    }

    const onSliderChange = name => (ev, value) => {
        setState({
            ...state, [name]: value
        })
        // alert(state[name])
    }

    const handleCommit = name => (ev, value) => {
        alert(`${name} ${value}`)
        setState({ ...state, [name]: value })
    }

    // const handleCommit = name => (e, value) => {

    //     setState({
    //         ...state, [name]:value
    //     })
    //     alert(`temp is: ${state.temp}`);
    //   }
    // const [value, setValue] = React.useState({ [props.sliderText]: 0 })
    // const handleChange = (ev, newValue) => {
    //     setValue(newValue)
    // }

    const handleSliderChange = name => (ev, value) => {
        ev.preventDefault()
        setState({
            ...state, [name]: value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        alert(JSON.stringify(state))
    }
    const classes = useStyles()
    const stName = 'temp'
    return (
        <form style={{ padding: '1rem', margin: 'auto' }}>
            <Grid container direction={'column'}
                justifyContent='flex-start'
                // alignItems='center'
                alignContent='center'>
                <Grid sx={6}
                    // direction='row-reverse'
                    item container
                    spacing={2}
                    alignItems='flex-start' >
                    {genresList.map((text, index) => (
                        <Grid item xs={4}>
                            <Paper elevation={1}>
                                <GenreButton flexGrow={1}
                                    key={index} variant='outlined'
                                    // style={{ minHeight: '64px' }}
                                    text={text}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Grid container item sx={5}
                    alignItems='center'
                    justifyContent='center' >
                    {/* <Paper > */}
                    <Grid item sm={'auto'}
                        container direction={'column'}>

                        {/* <Typography id="discrete-slider" gutterBottom>
                            Temperature
                        </Typography>
                        <Slider
                            defaultValue={state.stName}
                            value={state[stName]}
                            // getAriaValueText={valuetext}
                            // aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            name={stName}
                            onChange={onSliderChange(stName)}
                            onChangeCommitted={handleCommit(stName)}
                            step={10}
                            marks
                            min={10}
                            max={110}
                        /> */}

                        {descriptorsList.map((descriptor, key) => (
                            <Grid item mph={4}>
                                < SliderMUI key={key}
                                    value={state.descriptor}
                                    defaultValue={state[descriptor]}
                                    aria-text={descriptor}
                                    sliderText={descriptor}
                                    name={descriptor}
                                    onChange={onSliderChange(descriptor)}
                                    onChangeComitted={handleCommit(descriptor)}
                                />
                            </Grid>
                        ))}
                        <Divider variant='middle' />
                    </Grid>
                    {/* </Paper> */}


                    <Grid item sm={5} container
                        direction='column'
                        spacing={1}
                        justifyContent='flex-end'
                        alignItems='flex-start' >
                        {/* <Paper elevation={2} > */}
                        <SliderMUI height='10%' sliderText='Diversity'
                        value={state.Diversity}
                        // aria-text={descriptor}
                        // sliderText={descriptor}
                        // name={descriptor}
                        onChange={onSliderChange('Diversity')}
                        onChangeComitted={handleCommit('Diversity')} />
                        {/* <Toolbar > */}
                        <Grid sx={'auto'} item
                            container>
                            {descriptorsList.map((descriptor, key) => (
                                <Grid item sx={'auto'} sm={4}> < GenreButton key={key}
                                    text={descriptor} />
                                </Grid>
                            ))}
                        </Grid>
                        {/* </Toolbar> */}
                        <Button size="large"
                            variant="outlined"
                            onClick={onSubmit}
                            type='submit'
                            fullWidth >Generate Playlist</Button>
                        {/* </Paper> */}

                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

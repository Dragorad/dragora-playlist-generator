import React, { useState } from 'react'
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
import ContinousSlider from './SliderCopy'
import { getRandomInt } from '../player/demoUrls'
import { generatePlaylist } from '../../graphql/Realms'


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

const getRandomBpm = getRandomInt(85, 185)
const getRandomDelta = getRandomInt(10, 50)
console.log(`bpm: ${getRandomBpm}  delta: ${getRandomDelta}`)

const generateRandomInput = () => ({
    bpm: getRandomInt(85, 185),
    delta: getRandomInt(10, 50)
})

// const randomUrls = generatePlaylist(inputObj)

// export default randomUrls

const stateObj = {
    randomInt: 180,
    Brightness: 25,
    Loudness: 45,
    Tempo: 14,
    Diversity: 30,
    diversityStrings: [],
    genresButtons: {

    }
}
export  default function SlidersForm() {

    const [state, setState] = useState(
        stateObj)
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



    const handleSliderChange = name => (ev, value) => {
        ev.preventDefault()
        setState({
            ...state, [name]: value
        })
    }

    function onSubmit(e) {
        e.preventDefault()
        const newInput = generateRandomInput()
        console.log(newInput)
        setState({ ...state, randomInt: getRandomInt(90, 190) })
        // alert(JSON.stringify(state))
    }
    const classes = useStyles()
    return (
        <form style={{ padding: '1rem', margin: 'auto' }}>
            <Grid container
                xs={12} lg={8}
                xl={6}
                spacing={1}
                direction={'row'}
                justify={'space-between'}
                alignItems={'center'}
            // alignContent='center'
            >
                <Grid xs={12} sm={3} //genres'
                    style={{ padding: '1%', margin: 'auto' }}
                    item container
                    spacing={3}
                    direction={'row'}
                    justify='center'
                    alignItems='flex-start' >
                    <ButtonsGroupMultiple sm={6} inputArr={genresList} selected={false} />
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
                        {/* <Paper elevation={1}
                         style={{ padding: '2%', margin: 'auto' }}> */}
                        {/* //see slideer copy for template */}
                        {descriptorsList.map((descriptor, key) => (
                            // <Grid item sx={8}>
                            < SliderMUI key={key}
                                value={state.descriptor}
                                defaultValue={state[descriptor]}
                                aria-text={descriptor}
                                sliderText={descriptor}
                                name={descriptor}
                                onChange={onSliderChange(descriptor)}
                                onChangeComitted={handleCommit(descriptor)}
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
                            <Divider orientation='horizontal' flexItem />
                            <SliderMUI item
                                //  height='10%'
                                sliderText='Diversity'
                                value={state.Diversity}
                                // aria-text={descriptor}
                                // sliderText={descriptor}
                                // name={descriptor}
                                onChange={onSliderChange('Diversity')}
                                onChangeComitted={handleCommit('Diversity')} />
                            <ButtonsGroupMultiple sm={4} inputArr={descriptorsList} selected />

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

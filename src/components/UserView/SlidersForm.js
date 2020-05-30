import React from 'react'
import SliderMUI from './SliderMUI'
import {
    Button, Grid,
    Paper, Divider, Box, CssBaseline, AppBar, Toolbar, Container, GridList, GridListTile, makeStyles
} from '@material-ui/core'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { descriptorsList } from '../../workers/descriptorsList'
import GenreButton from './GenreButton'
import { flexbox, sizing } from '@material-ui/system'
import { grey } from '@material-ui/core/colors'
import CustomizedSlider from './SliderCopy'

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

    const classes = useStyles()
    return (
        <div style={{padding: '1rem', margin:'auto'}}>
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
                        {descriptorsList.map((descriptor, key) => (
                            <Grid item mph={4}>
                                < SliderMUI key={key}
                                    sliderText={descriptor} />
                            </Grid>
                        ))}
                    <Divider  variant='middle' />
                    </Grid>
                    {/* </Paper> */}


                    <Grid item sm={5} container
                        direction='column'
                        spacing={1}
                        justifyContent='flex-end'
                        alignItems='flex-start' >
                        {/* <Paper elevation={2} > */}
                            <SliderMUI height='10%' sliderText='Diversity' />
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
                                fullWidth >Generate Playlist</Button>
                        {/* </Paper> */}

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

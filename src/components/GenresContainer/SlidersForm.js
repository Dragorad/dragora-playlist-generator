import React from 'react'
import SliderMUI from './SliderMUI'
import { Container, Button, Grid, Paper, Divider, Box } from '@material-ui/core'
import { genresList } from '../../workers/genresList'
import GenreButton from './GenreButton'
import { flexbox } from '@material-ui/system'
import { grey } from '@material-ui/core/colors'


export default function SlidersForm() {
    return (
        <Box display='flex' flexDirection='column'
            alignContent='flexstart' p={2}>
            <Paper elevation={4}
            // className={classes.paper}
            >
                <Divider />
                <Box display="flex" p={1} >{genresList.map((text, index) => (
                    <Box>
                        <GenreButton key={index} text={text} />
                    </Box>
                ))}
                </Box>
            </Paper>

            <Divider orientation="vertical"
            // className={classes.divider}
            />

            <Paper elevation={2}>
                <Box display="flex" flexDirection="column"
                    m={2} maxHeight="50%" alignItems="center"
                >
                    <Box p={2}> <SliderMUI sliderText='Brightnes' /></Box>
                    <Box p={2}> <SliderMUI sliderText='Loudness' /></Box>
                    <Box p={2}> <SliderMUI sliderText='Tempo' /></Box>
                    <Box p={2}> <SliderMUI sliderText='Diversity' /></Box>

                    <Button size="large"
                        variant="outlined"
                        fullWidth >Generate Playlist</Button>
                </Box>
            </Paper>
        </Box>
    )
}

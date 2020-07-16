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



export default function GenresButtonsGroup() {
    return (
        // <div>
            <ButtonsGroupMultiple inputArr={genresList}
                selected={true} sm={6}
            />
        // </div>
    )
}

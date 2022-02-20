import React, { useContext } from 'react'
import { AppContext } from '../../stateContext/indexContext'
import * as types from '../../stateContext/types'
import { Button} from '@mui/material'
import { genresList } from '../../workers/genresAndInstrumentsList'
import { ButtonsGroupMultiple } from './GenreButton'
import { blueGrey } from '@mui/material/colors'



export default function GenresButtonsGroup() {
    const [appState, dispatch] = useContext(AppContext)
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
    return (
        <>
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
        </>
    )
}

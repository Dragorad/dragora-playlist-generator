import React, { useReducer, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { TextField, Typography } from '@material-ui/core'
import { UPDATE_GENRES, UPDATE_INSTRUMENTS } from '../../graphql/Mutations'
import { app } from '../../index'

// props - nameStr   updateMutation

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
}

export function UpdateFieldForm(props) {

    const MBID = props.titleMBID
    // console.log(props)

    const nameStr = props.nameStr
    const litNameStr = '${nameStr}'
    const [valueStr, setValueStr] = React.useState('')
    const h4String = (`Handle ${nameStr}`).toUpperCase()
    const handleFieldSubmit = nameStr == 'genres' &&
        handleUpdateTitleGenres
    //  : handleUpdateInstruments
    // const variablesObj = {
    //     variables: {
    //         titleMBID: MBID,
    //         [nameStr]: valueStr.split(','),
    //     }
    // }
    // const handleUpdateInstruments = async (instrObj) => {
    //     console.log(instrObj)
    // }
    const handleUpdateTitleGenres = async (genresArr) => {
        const newGenresArr = await app.functions.updateTitleGenres({
            titleMBID: MBID,
            genresArr: genresArr
        })
        const newValueString = newGenresArr.join(', ')
        newGenresArr !== undefined ? setValueStr(newValueString) : setValueStr("error from url TItleForm")
    }
    return (
        <form key={nameStr} style={formStyles}
            onSubmit={e => {
                e.preventDefault()
                handleFieldSubmit(nameStr)
                // h4String = " field updated"
                // setUrlString('')
            }}>
            <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography>
            <TextField id={nameStr} label={nameStr} name={nameStr}
                value={valueStr} placeholder={nameStr}
                // onChange={handleChange}

                onChange={event => {
                    event.preventDefault()
                    setValueStr(event.target.value)
                }}
                value={valueStr}
                // required={true}
                variant={'outlined'}
                helperText={`Set ${nameStr}`}
            />
            <button type="submit">{`update ${nameStr}`}</button>
        </form>
    )
}
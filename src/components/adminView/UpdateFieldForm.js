import React, { useReducer, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { TextField, Typography } from '@material-ui/core'

// props - nameStr   updateMutation

export function UpdateFieldForm(props) {
    const [handleUpdateGenre] = useMutation(UPDATE_GENRES)
    const [handleUpdateInstruments] = useMutation(UPDATE_INSTRUMENTS)
    const nameStr = props.nameStr
    const litNameStr = '${nameStr}'
    const [valueStr, setValueStr] = React.useState('')
    const h4String = (`Handle ${nameStr}`).toUpperCase()
    const variablesObj = {
        variables: {
            fieldValue: valueStr,
            titleMBID: MBID,
        }
    }
    const handleFieldSubmit = nameStr == 'genres' ?
        handleUpdateGenre : handleUpdateInstruments

    return (
        <form key={nameStr} style={formStyles}
            onSubmit={e => {
                e.preventDefault()
                console.log(variablesObj)
                handleUpdateGenre(variablesObj)
                // h4String = " field updated"
                // setUrlString('')
            }}>
            <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography>
            <TextField id={nameStr} label={nameStr} name={nameStr}
                value={nameStr} placeholder={nameStr}
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
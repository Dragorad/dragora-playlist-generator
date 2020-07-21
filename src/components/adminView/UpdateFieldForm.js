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
// https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript


function splitMulti(str, tokens) {
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}
export function UpdateFieldForm(props) {

    const MBID = props.titleMBID
    const MBGenres = props.MBGenres
    // console.log(props)

    const nameStr = props.nameStr
    const litNameStr = '${nameStr}'
    const [valueStr, setValueStr] = React.useState('')
    const h4String = (`Handle ${nameStr}`).toUpperCase()


    const submFunction = props.onSubmit
    return (
        <form key={nameStr} style={formStyles}
            onSubmit={(e) => {
                e.preventDefault()
                const splitters = ['/', ', ', '-', ' ']
                const valuesArr = nameStr === "Genres" ? props.MBGenres : []

                console.log(nameStr + ' : ' + valueStr)
                console.log(Array.isArray(props.MBGenres))
                valuesArr.push(valueStr)

                // get unique values from stackoverflow

                let newValuesArr = [...new Set(splitMulti(valuesArr.join(', '), splitters)
                    .map(el => el.trim()).filter(elem => elem !== ''))]
                const updateObj = { titleMBID: MBID, valuesArr: newValuesArr }
                console.log(updateObj)
                props.onSubmit(updateObj)
                // handleUpdateGenres(valueStr)

                // h4String = " field updated"
                // setUrlString('')
            }}>
            <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography>
            <TextField id={nameStr} label={nameStr} name={nameStr}
                value={valueStr} placeholder={nameStr}
                onChange={event => {
                    event.preventDefault()
                    let newValueStr = event.target.value
                    // console.log(newValueStr)
                    setValueStr(newValueStr)
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
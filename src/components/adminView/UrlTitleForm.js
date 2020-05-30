import React, { useReducer, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { TextField, Typography, div, Divider } from '@material-ui/core'
import { instrumentsList, genresList } from '../../workers/genresAndInstrumentsList'
import { ItemsList } from './SelectedList'
import { from } from 'apollo-boost'

const UPDATE_TITLE = gql`
mutation UpdateTitleRecord ($titleMBID: String!, $url: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { url: $url}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
const UPDATE_GENRES = gql`
mutation UpdateTitleRecord ($titleMBID: String!,$fieldValue: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { genres: [$fieldValue]}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
const UPDATE_INSTRUMENTS = gql`
mutation UpdateTitleRecord ($titleMBID: String!,$fieldValue: String!){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { instruments:{ soloInstr:[ $fieldValue]}}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`


export default function UrlTitleForm(props) {

  const initialState = {}
  const fieldNames = ['genres', 'instruments solo', 'instruments oblig']
  //  const {fieldNames} = props
  //   const initialState = {}

  fieldNames.map(strValue => {
    initialState[strValue] = ''
    return initialState
  })



  function UpdateFieldForm(props) {
    // const [state, dispatch] = useReducer(reducer, initialState)
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



  const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE,
    //    {
    //   variables: { titleMBID: props.data.titleMBID },
    //   skip: data == null
    // }
  )
  const MBID = props.titleMBID
  const [urlString, setUrlString] = React.useState('')
  const [genreString, setGenres] = React.useState('')

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    name === 'url' ? setUrlString(value)
      : setGenres(value)
  }
  let h4String = ['Handle Title URL', 'Handle Genres']
  return (
    <div style={{ display: 'flex', maxWidth: '1200 px',
     flexDirection: 'row', justifyItems:'space-evently'}}>
      <form key={MBID} style={formStyles}
        onSubmit={e => {
          e.preventDefault()
          handleUpdateTitleRecordURL({
            variables: {
              url: urlString,
              titleMBID: MBID
            }
          })
          h4String += " url updated"
          setUrlString('')
        }}>
        <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String[0]}</Typography>
        <TextField id={MBID} label="url" name='url'
          value={urlString} placeholder={urlString} onChange={handleChange}
          // required={true}
          variant={'outlined'}
          helperText="You Tube url"
        />
        <button type="submit">Update Title URL</button>
      </form>
      {/* <ItemsList arr={genresList} title='Genres' /> */}
      <UpdateFieldForm nameStr='Genres' style={formStyles} />
      <Divider orientation='vertical'/>
      <div style={{ display: 'flex', padding: '1%'}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['instruments solo', 'instruments oblig'].map(nameStr => <UpdateFieldForm 
          nameStr={nameStr}
          styles={formStyles} />)}
        </div>
      </div >
      {/* <ItemsList arr={instrumentsList} title='Instruments' /> */}

    </div >
  )
}

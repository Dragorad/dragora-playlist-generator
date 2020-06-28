import React, { useReducer, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { TextField, Typography, div, Divider } from '@material-ui/core'
import { instrumentsList, genresList } from '../../workers/genresAndInstrumentsList'
import { ItemsList } from './SelectedList'
// import { from } from 'apollo-boost'
import { UpdateFieldForm } from './UpdateFieldForm'
import { UPDATE_TITLE_URL, UPDATE_GENRES, UPDATE_INSTRUMENTS } from '../../graphql/Mutations'
import { app } from '../../../src/index'


export default function UrlTitleForm(props) {

  const initialState = {}
  const fieldNames = ['genres', 'instruments solo', 'instruments oblig']
  //  const {fieldNames} = props
  //   const initialState = {}

  fieldNames.map(strValue => {
    initialState[strValue] = ''
    return initialState
  })

  const handleUpdateTitleRecordURL = async (url) => {
    const newUrl = await app.functions.updateTitleUrl({
      titleMBID: MBID,
      url: urlString
    })
    newUrl !== undefined ? setUrlString(urlString) : setUrlString("error from url TItleForm")
  }

  const MBID = props.titleMBID
  const [urlString, setUrlString] = React.useState('')
  // sconst [genreString, setGenres] = React.useState('')

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    name === 'url' && setUrlString(value.substring(17))
    // : setGenres(value)
  }
  const clickUpdateUrl = () => handleUpdateTitleRecordURL({
    variables: {
      url: urlString,
      titleMBID: MBID
    }
  })
  let h4String = ['Handle Title URL', 'Handle Genres']
  return (
    <div style={{
      display: 'flex', maxWidth: '1200 px',
      flexDirection: 'row', justifyItems: 'space-evently'
    }}>
      <form key={MBID} style={formStyles}
        onSubmit={e => {
          e.preventDefault()
          handleUpdateTitleRecordURL(urlString)
          // handleUpdateTitleRecordURL({
          //   variables: {
          //     url: urlString,
          //     titleMBID: MBID
          //   }
          // })
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
      <UpdateFieldForm nameStr='Genres' style={formStyles} titleMBID={MBID} />
      <Divider orientation='vertical' />
      <div style={{ display: 'flex', padding: '1%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {['instruments solo', 'instruments oblig'].map(nameStr => <UpdateFieldForm
            titleMBID={MBID}
            nameStr={nameStr}
            styles={formStyles} />)}
        </div>
      </div >
      {/* <ItemsList arr={instrumentsList} title='Instruments' /> */}

    </div >
  )
}

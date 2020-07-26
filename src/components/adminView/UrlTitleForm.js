import React, { useReducer, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { TextField, Typography, div, Divider } from '@material-ui/core'
import { instrumentsList, genresList } from '../../workers/genresAndInstrumentsList'
import { ItemsList } from './SelectedList'
// import { from } from 'apollo-boost'
import { UpdateFieldForm } from './UpdateFieldForm'
import { UPDATE_TITLE_URL, UPDATE_GENRES, UPDATE_INSTRUMENTS } from '../../graphql/Mutations'
import { setTitleUrl } from '../../index'


export default function UrlTitleForm(props) {

  const initialState = {}
  // const fieldNames = ['genres', 'instruments solo', 'instruments oblig']
  // //  const {fieldNames} = props
  // //   const initialState = {}

  // fieldNames.map(strValue => {
  //   initialState[strValue] = ''
  //   return initialState
  // })
  // const { loading, error, data } = useQuery(TITLE_DATA)


  // const handleUpdateTitleRecordURL = async (url) => {
  //   const newUrl = await app.functions.updateTitleUrl({
  //     titleMBID: MBID,
  //     url: urlString
  //   })
  //   console.log(newUrl)
  //   newUrl !== undefined ? setUrlString(urlString) : setUrlString("error from url TItleForm")
  // }

  const MBID = props.titleMBID
  // const updatedUrl = props.url
  const [urlString, setUrlString] = React.useState('')
  const [updatedUrl, setUpdatedUrl] = React.useState(props.url)
  const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE_URL)

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setUrlString(value.substring(17))
    // : setGenres(value)
  }
  const clickUpdateUrl = () => handleUpdateTitleRecordURL({
    variables: {
      url: urlString,
      titleMBID: MBID
    }
  })
  const onSubmit = async (e) => {
    e.preventDefault()
    const variableObj = {
      titleMBID: MBID,
      url: urlString
    }
    console.log(variableObj)
    // handleUpdateTitleRecordURL(urlString)
    setTitleUrl(variableObj)
      .then(result => {
        const newUrl = result[0].url
        console.log(newUrl)
        // h4String[0] += " url updated"
        // // url = newUrl
        setUpdatedUrl(newUrl)
      }).catch(error => console.log(error.message))
  }


  let h4String = ['Handle Title URL', 'Handle Genres']
  return (
    <React.Fragment>
      {updatedUrl != null ? <iframe width="180"
        src={`https://www.youtube.com/embed/${urlString}`}>
      </iframe>
        : <p>No url provided </p>}

      <div style={{
        display: 'flex', maxWidth: '1200 px',
        flexDirection: 'row', justifyItems: 'space-evently'
      }}>
        <form key={MBID} style={formStyles}
        >
          <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String[0]}</Typography>
          <TextField id={MBID} label="url" name='url'
            value={urlString} placeholder={urlString}
            onChange={handleChange}
            // required={true}
            variant={'outlined'}
            helperText="You Tube url"
          />
          <button type="submit" onClick={onSubmit}
          >Update Title URL</button>
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
    </React.Fragment>
  )
}

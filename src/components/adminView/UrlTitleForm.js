import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { TextField, Typography, div, Divider } from '@material-ui/core'
import { UpdateFieldForm } from './UpdateFieldForm'
import { UPDATE_TITLE_URL } from '../../graphql/Mutations'
import { setTitleUrl, setTitleGenres, setTitleInstruments } from '../../index'


export default function UrlTitleForm(props) {

  const MBID = props.titleMBID
  // const updatedUrl = props.url
  const [urlString, setUrlString] = React.useState('')
  const [updatedUrl, setUpdatedUrl] = React.useState(props.url)
  // const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE_URL)
  console.log(props.oldGenres)
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
  }
  const handleChange = (event) => {
    const { value } = event.target
    setUrlString(value.substring(17))
    // : setGenres(value)
  }
  // const clickUpdateUrl = () => handleUpdateTitleRecordURL({
  //   variables: {
  //     url: urlString,
  //     titleMBID: MBID
  //   }
  // })
  const onUrlSubmit = async (e) => {
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
        title={props.url}
        src={`https://www.youtube.com/embed/${props.url}`}>
      </iframe>
        : <p>No url provided </p>}

      <div style={{
        display: 'flex', maxWidth: '1200 px',
        flexDirection: 'row', justifyItems: 'space-evently'
      }}>
        <form key={MBID + 'url'} style={formStyles}
        >
          <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String[0]}</Typography>
          <TextField id={MBID} label="url" name='url'
            value={urlString} placeholder={urlString}
            onChange={handleChange}
            // required={true}
            variant={'outlined'}
            helperText="You Tube url"
          />
          <button type="submit" onClick={onUrlSubmit}
          >Update Title URL</button>
        </form>
        {/* <ItemsList arr={genresList} title='Genres' /> */}
        <UpdateFieldForm nameStr='Genres' style={formStyles}
          titleMBID={MBID}
          MBGenres={props.MBGenres}
          oldGenres={props.oldGenres} onSubmit={setTitleGenres} />
        <Divider orientation='vertical' />
        <div style={{ display: 'flex', padding: '1%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {['instruments solo', 'instruments oblig'].map(nameStr =>
              <UpdateFieldForm
                onSubmit={setTitleInstruments}
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

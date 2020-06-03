import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { TextField, Typography } from '@material-ui/core'
import UrlTitleForm from './UrlTitleForm'



const TITLE_DATA = gql`
  query GetTitleData {
    title_records
    # (query: {bpm_lte:125} sortBy:CHORDS_KEY_ASC)
     {
    _id
     artist
    titleName
    chords_key
    titleMBID
    bpm
    url
    genres
  }
  }
`
const TITLE_RECORD = gql`
query GetTitleRecord ($titleMBID: String){
  title_record(query: {titleMBID: $titleMBID}) {
  _id
  artist
  titleName
  chords_key
  url
  bpm
  genres
  titleMBID
  }
}
`
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

export function TitlesArtistQuery() {
  const { loading, error, data } = useQuery(TITLE_DATA)
  const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE, {
    variables: { titleMBID: 'data.titleMBID' },
    skip: data == null
  })

  const [url, setUrl] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setUrl(event.target.value);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(
    {error.message} </p>;
  let data1 = (data.title_records).slice(69, 90)
  return (
    data1.map(({ _id, artist, titleName, bpm, chords_key, titleMBID, url, genres }) => (
      <div key={_id} style={{
        display: 'flex', flexDirection: 'column', paddingLeft: '3%',
        borderBottom: '1px solid gray', maxWidth: '600 px'
      }}>
        <p style={{ "color": "blue" }}>
          {artist}: {titleName}
          <p style={{ "color": "red" }} >
            :: chords_key {chords_key} - bpm {bpm}
          </p>
          <p style={{ color: "darkblue" }} id={titleMBID}>
            titleMBID: {titleMBID} <br />
            titleURL: {url} </p>
            <p style={{ color: "darkblue" }} id={titleMBID}>
            titleMBID: {titleMBID} <br />
            genres: {genres} </p>
        </p>
        <div style={{ color: " rgb(115, 41, 41)", display: 'flex', alignItems: 'space-between' }}>
          {url != null ? <iframe width="240"
            src={`https://www.youtube.com/embed/${url}`}>
          </iframe>
            : <p>No url provided </p>}
          <UrlTitleForm titleMBID={titleMBID} />
        
        </div>
      </div>
    ))
  )
}
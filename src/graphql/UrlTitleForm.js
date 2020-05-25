import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { TextField, Typography } from '@material-ui/core';


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

export default function UrlTitleForm(props) {
  const [handleUpdateTitleRecordURL] = useMutation(UPDATE_TITLE,
    //    {
    //   variables: { titleMBID: props.data.titleMBID },
    //   skip: data == null
    // }
  )
  const MBID = props.titleMBID
  const [urlString, setUrlString] = React.useState('url String');
  const handleChange = (event) => {
    let urlString = (event.target.value).substring(17)

    // https://youtu.be/3Qf-ZfYtxvA?list=RD3Qf-ZfYtxvA

    setUrlString(urlString)
  }
let h4String = 'Handle Title URL'
  return (

    <form key={MBID}
      onSubmit={e => {
        e.preventDefault()
        handleUpdateTitleRecordURL({
          variables: {
            url: urlString,
            titleMBID: MBID
          }
        })
        h4String +=" url updated"
        setUrlString('')
      }}>
      <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography>
      <button type="submit">Update Title URL</button>
      <TextField
        id={MBID}
        label="url"
        value={urlString}
        placeholder={MBID}
        onChange={handleChange}
        // required={true}
        variant={'outlined'}
        helperText="You Tube url"
      />

    </form>
    // <TextField
    //     id={props.id}
    //     label="url"
    //     value={''}
    //     onChange={handleChange}
    //     required={true}
    //     variant={'outlined'}
    //     helperText="You Tube url"
    // />
  )
}

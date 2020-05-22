import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'


const TITLE_ARTIST = gql`
  query GetTitleArtist {
    title_records(query: {bpm_lte:125} sortBy:CHORDS_KEY_ASC) {
    _id
      artist
      titleName
  chords_key
  bpm
  }
  }
`
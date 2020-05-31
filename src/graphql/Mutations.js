import { gql } from "apollo-boost"

export const UPDATE_TITLE_URL = gql`
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

export const UPDATE_GENRES = gql`
mutation UpdateTitleRecord ($titleMBID: String!,$fieldValue: [String!]){
 updateOneTitle_record(
    query: {titleMBID: $titleMBID}
    set: { genres: $fieldValue}
    # skip: !$titleMBID
    ){
      titleName
      url
  }
}
`
export const UPDATE_INSTRUMENTS = gql`
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

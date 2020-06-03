import { gql, from } from "apollo-boost"

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

// from Stitch Graphql
// mutation {
//   updateOneTitle_record(query: { titleMBID: "7ae60709-bd13-46d5-a9a8-0092e2f2a462" }, set: { genres: ["pop", "jazzy", "rock"] }) {
//     _id
//     titleMBID
//     titleName
//     genres
//   }
// }
export const UPDATE_GENRES = gql`
mutation UpdateTitleRecordGenres ($titleMBID: String!,$fieldValue: [String!]){
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

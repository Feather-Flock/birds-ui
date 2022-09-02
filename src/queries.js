import { gql } from "@apollo/client";


export const GET_USER_BY_ID = gql`
query user($id: ID!) {
  user(id: $id) {
    id
    userName
    email
    image
    zipCode
    rsvpdEvents(id: $id) {
      id
      title
      description
      zip
      lat
      lng
      date
      time
      host
    }
    nearEvents(id: $id) {
      id
      title
      description
      date
      lat
      lng
      time
    }
  }
}`

export const GET_EVENT_BY_ID = gql`
  query event($id: Int!) {
    event(id: $id) {
      title
      description
      time
      date
      lat
      lng
      address
      city
      state
      zip
      creator(id: $id) {
        email
        userName
        image
        zipCode
        description
      }
    }
}
`


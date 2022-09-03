import { gql} from "@apollo/client";


export const GET_USER_BY_ID = gql`
query user($id: ID!) {
  user(id: $id) {
    id
    userName
    email
    description
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
    userDefined(id: $id, range: 10) {
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
      description
      title
      time
      lat
      date
      address
      lng
      city
      state
      zip
      creator(id: $id) {
        id
        email
        userName
        image
        zipCode
        description
      }
    }
}
`
export const MAKE_NEW_EVENT = gql`
mutation createEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    event {
          title
          description
          time
          date
          address
          city
          state
          zip
          lat
          lng
          host
          rsvps
      }
    }
  }
`


export const USER_RSVP_TO_EVENT = gql`
  mutation createUserEvent($input: CreateUserEventInput!) {
    createUserEvent(input: $input) {
      userEvent {
        userId
        eventId
        createdAt
      }
    }
  }
`

export const USER_DELETE_RSVP = gql`
  mutation deleteUserEvent($input: DeleteUserEventInput!) {
    deleteUserEvent(input: $input) {
      userEvent {
        userId
        eventId
        createdAt
      }
    }
  }
`

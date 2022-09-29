import { gql} from "@apollo/client";

export const GET_USER_BY_ID = gql`
query user($id: ID!, $range: Int!) {
  user(id: $id) {
    id
    userName
    email
    description
    image
    lat
    lng
    zipCode
    rsvpdEvents(id: $id) {
      id
      title
      description
      zip
      lat
      lng
      slug
      date
      time
      host
      rsvps
    }
    userEvents(id: $id) {
      id
      title
      description
      zip
      lat
      lng
      slug
      date
      time
      host
      rsvps
    }
    userDefined(id: $id, range: $range) {
      id
      title
      description
      date
      lat
      lng
      slug
      time
      rsvps
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
      slug
      city
      state
      zip
      rsvps
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
          slug
          host
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
      id
    }
  }
`

export const DELETE_EVENT = gql`
  mutation destroyEvent($input: DestroyEventInput!) {
    destroyEvent(input:$input) {
      id
    }
  }
`

export const GET_USER_PROFILE_INFO = gql`
query user($id: ID!) {
  user(id: $id) {
    id
    userName
    email
    description
    image
    lat
    lng
    zipCode
    rsvpdEvents(id: $id) {
      id
      title
      description
      zip
      lat
      lng
      slug
      date
      time
      host
      rsvps
    }
    userEvents(id: $id) {
      id
      title
      description
      zip
      lat
      lng
      slug
      date
      time
      host
      rsvps
    }
  }
}`

export const UPDATE_USER_PROFILE = gql`
mutation UpdateUser($input: UpdateUserInput!){
  updateUser(input: $input) {
      user {
          id
          userName
          email
          description
          image
          zipCode
      }
  }
}
`

export const CREATE_TAG = gql`
mutation createTag($input: CreateTagInput!) {
  createTag(input: $input) {
      tag {
          id
          title
      }
  }
}
`

export const CREATE_USER_TAG = gql`
mutation createUserTag($input: CreateUserTagInput!) {
  createUserTag(input: $input) {
      userTag{
          userId
          tagId
          id
      }
  }
}
`
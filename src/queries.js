import { gql } from "@apollo/client";

// "user": {
//   "id": "int",
//   "email": "string",
//   "userName": "string",
//  "image": "string",
//  "descriptionOfFamily": "String",
//   "userEvents": [ // Events User Created
//     {
//       "id": "int",
//       "title": "string",
//       "description": "string",
//   "zipCode": "int",
//       "lat": "float",
//       "lng": "float"
//     }
//   ],
//   "rsvpdEvents": [
//     {
//         "id": "int",
//         "title": "string",
//         "description": "string",
//     "zipCode": "int",
//         "lat": "float",
//         "lng": "float",
//         "creatorId": "int"
//     }
//   ]
// },
// "eventsInUserArea": [ // All events
//   {
//     "id": "int",
//     "title": "string",
//     "description": "string",
//    "zipCode": "int",
//     "lat": "float",
//     "lng": "float",
//    "creator
//   }
// ]
// }


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
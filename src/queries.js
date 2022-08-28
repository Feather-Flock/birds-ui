// import { gql } from "@apollo/client";

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


// export const GET_USER_BY_ID = gql`
// query getUserById($id: ID!) {
//   getUserById(id: $id) {
//     id
//     userName
//   	email
//     image
//     descriptionOfFamily
//     userEvents {
//       title
//     }
//     rsvpEvents {
//       title
//       date
//     }
//   }
// }`
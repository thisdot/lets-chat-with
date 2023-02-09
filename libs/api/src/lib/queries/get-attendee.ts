import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const GET_ATTENDEE_QUERY = gql`
  query getAttendee($id: ID!) {
    getAttendee(id: $id) {
      id
      fullName
      avatarUrl
      title
      company
      pronouns
      bio
      interests {
        items {
          id
          interest {
            id
            name
          }
        }
      }
      desiredIdentifiers {
        items {
          id
          identifier {
            id
            name
          }
        }
      }
      ownIdentifiers {
        items {
          id
          identifier {
            id
            name
          }
        }
      }
      linkedin
      facebook
      twitter
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class GetAttendeeGQL extends Query<{
  getAttendee: any;
}> {
  document = GET_ATTENDEE_QUERY;
}

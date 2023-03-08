import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { ModelAttendeeFilterInput } from '../api.service';
import { Attendee } from '../model';

export const LIST_ATTENDEES_QUERY = gql`
  query listAttendeeEvents($filter: ModelAttendeeFilterInput) {
    listAttendees(filter: $filter) {
      items {
        id
        fullName
        avatarUrl
        company
        pronouns
        title
        bio
        interests {
          items {
            interest {
              id
              name
            }
          }
        }
        desiredIdentifiers {
          items {
            identifier {
              id
              name
            }
          }
        }
        ownIdentifiers {
          items {
            identifier {
              id
              name
            }
          }
        }
        eventId
        attendeeMatches {
          id
        }
        attendeeChats {
          id
        }
        event {
          id
          name
          description
          logoUrl
          letsChatWithUrl
          qrImageUrl
          readers
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListAttendeesGQL extends Query<
  {
    listAttendees: { items: Attendee[] };
  },
  {
    filter: ModelAttendeeFilterInput;
  }
> {
  document = LIST_ATTENDEES_QUERY;
}

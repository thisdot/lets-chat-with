import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { Candidate } from '../model';
import { ModelSortDirection } from '../api.service';

const QUERY = gql`
  query CandidatesByEventId(
    $eventId: ID
    $ownerAttendeeId: ID
    $sortDirection: ModelSortDirection
  ) {
    candidatesByEventId(
      eventId: $eventId
      sortDirection: $sortDirection
      filter: { candidateType: { eq: UNDECIDED }, ownerAttendeeId: { eq: $ownerAttendeeId } }
    ) {
      items {
        id
        candidateType
        attendee {
          id
          fullName
          avatarUrl
          title
          bio
          company
          pronouns
          interests {
            items {
              id
              interest {
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
          desiredIdentifiers {
            items {
              id
              identifier {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class CandidatesByEventGQL extends Query<
  {
    candidatesByEventId: {
      items: Array<Candidate>;
    };
  },
  {
    eventId: string;
    ownerAttendeeId: string;
    sortDirection: ModelSortDirection;
  }
> {
  document = QUERY;
}

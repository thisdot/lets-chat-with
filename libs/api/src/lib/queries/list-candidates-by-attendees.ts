import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { Candidate } from '../model';

export const SEARCH_CANDIDATES_BY_ATTENDEES_QUERY = gql`
  query listCandidates($ownerAttendeeId: ID!, $attendeeId: ID!) {
    listCandidates(
      filter: { ownerAttendeeId: { eq: $ownerAttendeeId }, attendeeId: { eq: $attendeeId } }
    ) {
      items {
        id
        candidateType
        attendee {
          id
          fullName
          title
          bio
          company
          pronouns
          interests {
            items {
              id
            }
          }
          ownIdentifiers {
            items {
              id
            }
          }
          desiredIdentifiers {
            items {
              id
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
export class ListCandidatesByAttendeeIdsGQL extends Query<
  {
    listCandidates: {
      items: Array<Candidate>;
    };
  },
  {
    ownerAttendeeId: string;
    attendeeId: string;
  }
> {
  document = SEARCH_CANDIDATES_BY_ATTENDEES_QUERY;
}

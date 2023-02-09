import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { Candidate } from '../model';

export const SEARCH_CANDIDATES_BY_EVENT_QUERY = gql`
  query listCandidates($eventId: ID!) {
    listCandidates(filter: { eventId: { eq: $eventId }, candidateType: { eq: UNDECIDED } }) {
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
export class ListCandidatesByEventIdGQL extends Query<
  {
    listCandidates: {
      items: Array<Candidate>;
    };
  },
  {
    eventId: string;
  }
> {
  document = SEARCH_CANDIDATES_BY_EVENT_QUERY;
}

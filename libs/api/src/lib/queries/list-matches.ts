import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { MatchFragment, matchFragment } from '../fragment';

export const LIST_MATCHES_QUERY = gql`
  ${matchFragment}

  query listMatches($eventId: ID!) {
    listMatches(filter: { eventId: { eq: $eventId } }) {
      items {
        ...Match
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListMatchesGQL extends Query<
  {
    listMatches: {
      items: Array<MatchFragment>;
    };
  },
  {
    eventId: string;
  }
> {
  document = LIST_MATCHES_QUERY;
}

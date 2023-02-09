import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { matchDetailsFragment, MatchDetailsFragment } from '../fragment';

export const GET_MATCH_QUERY = gql`
  ${matchDetailsFragment}

  query GetMatch($id: ID!) {
    getMatch(id: $id) {
      ...MatchDetails
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetMatchGQL extends Query<
  {
    getMatch: MatchDetailsFragment;
  },
  {
    id: string;
  }
> {
  document = GET_MATCH_QUERY;
}

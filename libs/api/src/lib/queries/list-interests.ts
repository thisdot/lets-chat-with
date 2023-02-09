import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const LIST_INTERESTS_QUERY = gql`
  query listInterests($limit: Int) {
    listInterests(limit: $limit) {
      items {
        id
        group
        name
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListInterestsGQL extends Query<
  {
    listInterests: any;
  },
  {
    limit: number;
  }
> {
  document = LIST_INTERESTS_QUERY;
}

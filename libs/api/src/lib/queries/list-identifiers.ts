import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const LIST_IDENTIFIERS_QUERY = gql`
  query listIdentifiers($limit: Int) {
    listIdentifiers(limit: $limit) {
      items {
        id
        name
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListIdentifiersGQL extends Query<
  {
    listIdentifiers: any;
  },
  {
    limit: number;
  }
> {
  document = LIST_IDENTIFIERS_QUERY;
}

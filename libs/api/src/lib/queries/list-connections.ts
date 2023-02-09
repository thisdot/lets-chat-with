import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const LIST_CONNECTIONS_QUERY = gql`
  query listConnections($limit: Int) {
    listConnections(limit: $limit) {
      items {
        name
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListConnectionsGQL extends Query<
  {
    listConnections: any;
  },
  {
    limit: number;
  }
> {
  document = LIST_CONNECTIONS_QUERY;
}

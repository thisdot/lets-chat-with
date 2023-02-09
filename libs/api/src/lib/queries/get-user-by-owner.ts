import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { User } from '../model/index';

@Injectable({
  providedIn: 'root',
})
export class GetUserByOwnerGQL extends Query<
  {
    getUserByOwner: { items: User[] };
  },
  {
    owner: string;
  }
> {
  document = gql`
    query GetUserByOwner(
      $owner: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelUserFilterInput
      $limit: Int
      $nextToken: String
    ) {
      getUserByOwner(
        owner: $owner
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          owner
          termsAccepted
          notificationConfig {
            matches
            messages
            subscribe
          }
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
}

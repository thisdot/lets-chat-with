import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetUserGQL extends Query<
  {
    getUser: any;
  },
  {
    id: string;
  }
> {
  document = gql`
    query getUser($id: ID!) {
      getUser(id: $id) {
        id
        termsAccepted
        notificationConfig {
          matches
          messages
          subscribe
        }
      }
    }
  `;
}

import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GetEventGQL extends Query<
  {
    getEvent: any;
  },
  {
    id: string;
  }
> {
  document = gql`
    query getEvent($id: ID!) {
      getEvent(id: $id) {
        id
        name
        description
        letsChatWithUrl
        maxIdentifiers
        maxInterests
        interests {
          items {
            interest {
              id
              group
              name
            }
          }
        }
        identifiers {
          items {
            identifier {
              id
              name
            }
          }
        }
        logoUrl
        qrImageUrl
      }
    }
  `;
}

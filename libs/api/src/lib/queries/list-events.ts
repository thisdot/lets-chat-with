import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const LIST_EVENTS_QUERY = gql`
  query listEvents {
    listEvents {
      items {
        id
        name
        description
        letsChatWithUrl
        logoUrl
        qrImageUrl
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class ListEventsGQL extends Query<{
  listEvents: { items: any[] };
}> {
  document = LIST_EVENTS_QUERY;
}

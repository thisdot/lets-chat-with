import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';

export const ACCESS_EVENT_MUTATION = gql`
  mutation AccessEvent($letsChatWithUrl: String) {
    accessEvent(letsChatWithUrl: $letsChatWithUrl)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AccessEventGQL extends Mutation<
  {
    accessEvent: string;
  },
  {
    letsChatWithUrl: string;
  }
> {
  document = ACCESS_EVENT_MUTATION;
}

import gql from 'graphql-tag';
import { Subscription } from 'apollo-angular';
import { Message } from '../model';
import { Injectable } from '@angular/core';

export const ON_CREATE_MESSAGE_SUBSCRIPTION = gql`
  subscription onCreateMessage($chatThreadId: ID!) {
    onCreateMessage(chatThreadId: $chatThreadId) {
      __typename
      id
      content
      createdAt
      attendeeId
      chatThreadId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OnCreateMessageGQL extends Subscription<
  {
    onCreateMessage: Message;
  },
  {
    chatThreadId: string;
  }
> {
  document = ON_CREATE_MESSAGE_SUBSCRIPTION;
}

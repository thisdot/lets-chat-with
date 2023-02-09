import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { CreateMessageInput } from './../api.service';
import { Message } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CreateMessageGQL extends Mutation<
  { createMessage: Message },
  { input: CreateMessageInput }
> {
  document = gql`
    mutation createMessage($input: CreateMessageInput!) {
      createMessage(input: $input) {
        __typename
        id
        content
        createdAt
        attendeeId
        chatThreadId
      }
    }
  `;
}

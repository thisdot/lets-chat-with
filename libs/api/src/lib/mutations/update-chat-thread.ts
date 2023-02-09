import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { UpdateChatThreadInput } from './../api.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateChatThreadGQL extends Mutation<
  { updateChatThread: any },
  { input: UpdateChatThreadInput }
> {
  document = gql`
    mutation updateChatThread($input: UpdateChatThreadInput!) {
      updateChatThread(input: $input) {
        id
        lastMessageAt
        matchId
        updatedAt
      }
    }
  `;
}

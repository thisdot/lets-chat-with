import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { GQLCollection, ChatThread } from './../model';
import { ModelChatThreadFilterInput } from '../api.service';

export const LIST_CHAT_THREADS_QUERY = gql`
  query listChatThreads($filter: ModelChatThreadFilterInput, $limit: Int, $nextToken: String) {
    listChatThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      __typename
      items {
        id
        messages(limit: 1, sortDirection: DESC) {
          items {
            content
          }
          nextToken
        }
        eventId
        lastMessageAt
        attendee1LastReadAt
        attendee2LastReadAt
        matchId
      }
      nextToken
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ListChatThreadsGQL extends Query<
  {
    listChatThreads: GQLCollection<ChatThread>;
  },
  { filter: ModelChatThreadFilterInput }
> {
  document = LIST_CHAT_THREADS_QUERY;
}

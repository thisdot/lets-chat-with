import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { ChatThread } from './../model';

export const GET_CHAT_THREAD_QUERY = gql`
  query getChatThread($id: ID!, $limit: Int, $nextToken: String) {
    getChatThread(id: $id) {
      id
      lastMessageAt
      matchId
      match {
        id
        desiredIdentifiers {
          items {
            attendeeId
            desiredIdentifier {
              name
              id
            }
          }
        }
        interests {
          items {
            attendeeId
            interest {
              name
              id
            }
          }
        }
      }
      messages(limit: $limit, sortDirection: DESC, nextToken: $nextToken) {
        __typename
        items {
          id
          content
          attendeeId
          createdAt
        }
        nextToken
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class GetChatThreadGQL extends Query<{ getChatThread: ChatThread }> {
  document = GET_CHAT_THREAD_QUERY;
}

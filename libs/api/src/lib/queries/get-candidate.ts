import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';

export const GET_CANDIDATE_QUERY = gql`
  query getCandidate($id: ID!) {
    getCandidate(id: $id) {
      id
      candidateType
      attendee {
        id
        fullName
        title
        bio
        company
        pronouns
        interests {
          items {
            id
          }
        }
        ownIdentifiers {
          items {
            id
          }
        }
        desiredIdentifiers {
          items {
            id
          }
        }
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class GetCandidateGQL extends Query<{
  getCandidate: any;
}> {
  document = GET_CANDIDATE_QUERY;
}

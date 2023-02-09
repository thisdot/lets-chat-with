import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { UpdateCandidateInput } from '../api.service';
export const UPDATE_CANDIDATE_MUTATION = gql`
  mutation UpdateCandidate($input: UpdateCandidateInput!) {
    updateCandidate(input: $input) {
      id
      attendeeId
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class UpdateCandidateGQL extends Mutation<
  { updateCandidate: any },
  { input: UpdateCandidateInput }
> {
  document = UPDATE_CANDIDATE_MUTATION;
}

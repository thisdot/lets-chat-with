import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';
import { UpdateAttendeeInput } from '../api.service';

export const UPDATE_ATTENDEE_MUTATION = gql`
  mutation UpdateAttendee($input: UpdateAttendeeInput!) {
    updateAttendee(input: $input) {
      id
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class UpdateAttendeeGQL extends Mutation<
  {
    updateAttendee: any;
  },
  {
    input: UpdateAttendeeInput;
  }
> {
  document = UPDATE_ATTENDEE_MUTATION;
}

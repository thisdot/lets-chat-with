import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';
import { UpdateUserInput, ModelUserConditionInput } from '../api.service';
import { User } from './../model';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserGQL extends Mutation<
  { updateUser: User },
  {
    input: UpdateUserInput;
    condition?: ModelUserConditionInput;
  }
> {
  document = gql`
    mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
      updateUser(input: $input, condition: $condition) {
        id
        termsAccepted
        notificationConfig {
          matches
          messages
          subscribe
        }
      }
    }
  `;
}

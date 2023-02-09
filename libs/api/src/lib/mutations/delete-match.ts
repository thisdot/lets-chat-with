import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';
import { DeleteMatchInput } from '../api.service';
import { User } from './../model';

@Injectable({
  providedIn: 'root',
})
export class DeleteMatchGQL extends Mutation<
  { updateUser: User },
  {
    input: DeleteMatchInput;
  }
> {
  document = gql`
    mutation DeleteMatch($input: DeleteMatchInput!) {
      deleteMatch(input: $input) {
        id
      }
    }
  `;
}

import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import { UpdateMatchInput } from '../api.service';
import { Match } from '../model';

@Injectable({ providedIn: 'root' })
export class UpdateMatchGQL extends Mutation<{ updateMatch: Match }, { input: UpdateMatchInput }> {
  document = gql`
    mutation UpdateMatch($input: UpdateMatchInput!) {
      updateMatch(input: $input) {
        id
      }
    }
  `;
}

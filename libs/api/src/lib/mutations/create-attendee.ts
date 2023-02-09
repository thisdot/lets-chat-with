import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';
import { CreateAttendeeInput } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CreateAttendeeGQL extends Mutation<
  { createAttendee: any },
  {
    input: CreateAttendeeInput;
  }
> {
  document = gql`
    mutation CreateAttendee($input: CreateAttendeeInput!) {
      createAttendee(input: $input) {
        __typename
        id
        fullName
        avatarUrl
        title
        company
        pronouns
        bio
        newsletterSubscribed
        linkedin
        twitter
        facebook
      }
    }
  `;
}

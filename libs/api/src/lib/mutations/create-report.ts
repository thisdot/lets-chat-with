import { Injectable } from '@angular/core';
import { CreateReportInput } from '../api.service';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class CreateReportGQL extends Mutation<
  { createReport: any },
  {
    input: CreateReportInput;
  }
> {
  document = gql`
    mutation createReport($input: CreateReportInput!) {
      createReport(input: $input) {
        __typename
        id
        eventId
        reportedAttendeeId
        reportingAttendeeId
        reason
        status
        message
      }
    }
  `;
}

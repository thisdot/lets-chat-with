import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Mutation } from 'apollo-angular';
import { UpdateReportInput, ModelReportConditionInput } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateReportGQL extends Mutation<
  { updateReport: any },
  {
    input: UpdateReportInput;
    condition?: ModelReportConditionInput;
  }
> {
  document = gql`
    mutation UpdateReport($input: UpdateReportInput!, $condition: ModelReportConditionInput) {
      updateReport(input: $input, condition: $condition) {
        id
        eventId
        message
        reason
        status
        reportedAttendee {
          fullName
          id
          avatarUrl
          title
        }
      }
    }
  `;
}

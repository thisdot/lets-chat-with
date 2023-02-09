import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { Report } from '../api.service';

export const GET_USER_REPORTS_BY_EVENT_QUERY = gql`
  query listUserReportsByEvent($reportedAttendeeId: ID!, $eventId: ID!) {
    listReports(
      filter: { reportedAttendeeId: { eq: $reportedAttendeeId }, eventId: { eq: $eventId } }
    ) {
      items {
        id
        eventId
        message
        reason
        status
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UserListReportsGQL extends Query<
  {
    listReports: {
      items: Array<Report>;
    };
  },
  {
    reportedAttendeeId: string;
    eventId: string;
  }
> {
  document = GET_USER_REPORTS_BY_EVENT_QUERY;
}

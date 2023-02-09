import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Query } from 'apollo-angular';
import { Report, ReportStatus } from '../api.service';

export const LIST_REPORTS_QUERY = gql`
  query listReports($reportStatus: ReportStatus!, $eventId: ID!) {
    listReports(filter: { status: { eq: $reportStatus }, eventId: { eq: $eventId } }) {
      items {
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
        reportingAttendee {
          fullName
          id
          avatarUrl
          title
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ListReportsGQL extends Query<
  {
    listReports: {
      items: Array<Report>;
    };
  },
  {
    reportStatus: ReportStatus;
    eventId: string;
  }
> {
  document = LIST_REPORTS_QUERY;
}

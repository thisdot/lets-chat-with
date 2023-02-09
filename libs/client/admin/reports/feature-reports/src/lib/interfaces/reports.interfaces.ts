import { ReportStatus } from '@conf-match/api';

export type ReportReason = 'INAPPROPRIATE_MESSAGE' | 'INAPPROPRIATE_PHOTO' | 'SPAM' | 'OTHER';

export interface ReportedAttendee {
  reportId: string;
  eventId: string;
  attendeeId: string;
  fullName: string;
  avatarUrl: string;
  title: string;
  note?: string;
  reportReason: ReportReason;
  reportingAttendee: ReportingAttendee;
  status: ReportStatus;
}

interface ReportingAttendee {
  attendeeId: string;
  fullName: string;
  avatarUrl: string;
}

export interface BanAttendee {
  reportId: string;
  eventId: string;
  attendeeId: string;
  reportReason: ReportReason;
  note?: string;
}

export interface DismissAttendee {
  reportId: string;
  eventId: string;
  attendeeId: string;
  note?: string;
}

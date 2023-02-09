import * as apiModule from './lib/api.module';

export * from './lib/api.module';
export const api = apiModule;
export {
  GQLCollection,
  Message,
  Event,
  Attendee,
  User,
  Candidate,
  Match,
  MatchInterest,
  MatchDesiredIdentifier,
  MatchDetails,
  MatchAttendee,
  NotificationConfig,
  ChatThread,
  CandidateType,
} from './lib/model';

export {
  Attendee as AttendeeModel,
  Interest as InterestModel,
  Identifier as IdentifierModel,
  Event as EventModel,
} from './lib/model';

export { Event as ApiEvent, Attendee as ApiAttendee, Report as ApiReport } from './lib/api.service';

export * from './lib/fragment';
export * from './lib/mutations';
export * from './lib/queries';
export * from './lib/subscriptions';
export * from './lib/graphql-client';
export * from './lib/mappers';

/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'zen-observable-ts';

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateMessage: OnCreateMessageSubscription;
};

export type CreateAttendeeInput = {
  id?: string | null;
  owner: string;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  eventId: string;
  interests?: Array<string> | null;
  desiredIdentifiers?: Array<string> | null;
  ownIdentifiers?: Array<string> | null;
  createdAt?: string | null;
};

export type Attendee = {
  __typename: 'Attendee';
  id: string;
  owner?: string | null;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  interests?: ModelAttendeeInterestConnection | null;
  desiredIdentifiers?: ModelAttendeeDesiredIdentifierConnection | null;
  ownIdentifiers?: ModelAttendeeOwnIdentifierConnection | null;
  eventId: string;
  attendeeMatches?: Array<Match | null> | null;
  attendeeChats?: Array<ChatThread | null> | null;
  event?: Event | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelAttendeeInterestConnection = {
  __typename: 'ModelAttendeeInterestConnection';
  items: Array<AttendeeInterest | null>;
  nextToken?: string | null;
};

export type AttendeeInterest = {
  __typename: 'AttendeeInterest';
  id: string;
  attendeeId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendee: Attendee;
  interest: Interest;
  createdAt: string;
  updatedAt: string;
};

export type Interest = {
  __typename: 'Interest';
  id: string;
  group: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelAttendeeDesiredIdentifierConnection = {
  __typename: 'ModelAttendeeDesiredIdentifierConnection';
  items: Array<AttendeeDesiredIdentifier | null>;
  nextToken?: string | null;
};

export type AttendeeDesiredIdentifier = {
  __typename: 'AttendeeDesiredIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: Attendee;
  identifier: Identifier;
  createdAt: string;
  updatedAt: string;
};

export type Identifier = {
  __typename: 'Identifier';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ModelAttendeeOwnIdentifierConnection = {
  __typename: 'ModelAttendeeOwnIdentifierConnection';
  items: Array<AttendeeOwnIdentifier | null>;
  nextToken?: string | null;
};

export type AttendeeOwnIdentifier = {
  __typename: 'AttendeeOwnIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: Attendee;
  identifier: Identifier;
  createdAt: string;
  updatedAt: string;
};

export type Match = {
  __typename: 'Match';
  id: string;
  owners: Array<string>;
  attendee1Id: string;
  attendee2Id: string;
  eventId: string;
  event?: Event | null;
  createdAt: string;
  attendee1?: Attendee | null;
  attendee2?: Attendee | null;
  interests?: ModelMatchInterestConnection | null;
  desiredIdentifiers?: ModelMatchDesiredIdentifierConnection | null;
  updatedAt: string;
};

export type Event = {
  __typename: 'Event';
  id: string;
  organizationId: string;
  organization: Organization;
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  theme?: Theme | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: EventDateRange;
  interests?: ModelEventInterestConnection | null;
  identifiers?: ModelEventIdentifierConnection | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<EventPayments> | null;
  attendees?: ModelAttendeeConnection | null;
  reports?: ModelReportConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type Organization = {
  __typename: 'Organization';
  id: string;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  events?: ModelEventConnection | null;
  members?: ModelOrganizationMemberConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelEventConnection = {
  __typename: 'ModelEventConnection';
  items: Array<Event | null>;
  nextToken?: string | null;
};

export type ModelOrganizationMemberConnection = {
  __typename: 'ModelOrganizationMemberConnection';
  items: Array<OrganizationMember | null>;
  nextToken?: string | null;
};

export type OrganizationMember = {
  __typename: 'OrganizationMember';
  organizationId: string;
  organization: Organization;
  userId: string;
  role: OrganizationMemberRole;
  createdAt: string;
  updatedAt: string;
};

export enum OrganizationMemberRole {
  MEMBER = 'MEMBER',
  MARKETING = 'MARKETING',
  VOLUNTEER = 'VOLUNTEER',
  SALES = 'SALES',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  TERMINATED = 'TERMINATED',
}

export enum EventSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export type Theme = {
  __typename: 'Theme';
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  createdAt: string;
  updatedAt: string;
};

export type EventDateRange = {
  __typename: 'EventDateRange';
  startDate: string;
  endDate: string;
};

export type ModelEventInterestConnection = {
  __typename: 'ModelEventInterestConnection';
  items: Array<EventInterest | null>;
  nextToken?: string | null;
};

export type EventInterest = {
  __typename: 'EventInterest';
  id: string;
  eventId: string;
  interestId: string;
  event: Event;
  interest: Interest;
  createdAt: string;
  updatedAt: string;
};

export type ModelEventIdentifierConnection = {
  __typename: 'ModelEventIdentifierConnection';
  items: Array<EventIdentifier | null>;
  nextToken?: string | null;
};

export type EventIdentifier = {
  __typename: 'EventIdentifier';
  id: string;
  eventId: string;
  identifierId: string;
  event: Event;
  identifier: Identifier;
  createdAt: string;
  updatedAt: string;
};

export enum EventPaymentStatus {
  REQUIRED = 'REQUIRED',
  PAID_IN_FULL = 'PAID_IN_FULL',
  DEFAULTED = 'DEFAULTED',
}

export type EventPayments = {
  __typename: 'EventPayments';
  paymentMethod: OrganizationPaymentMethod;
  transactionId: string;
  amount: number;
  receivedAt: string;
};

export type OrganizationPaymentMethod = {
  __typename: 'OrganizationPaymentMethod';
  name: string;
  provider: string;
  method: string;
  token: string;
};

export type ModelAttendeeConnection = {
  __typename: 'ModelAttendeeConnection';
  items: Array<Attendee | null>;
  nextToken?: string | null;
};

export type ModelReportConnection = {
  __typename: 'ModelReportConnection';
  items: Array<Report | null>;
  nextToken?: string | null;
};

export type Report = {
  __typename: 'Report';
  eventId: string;
  event: Event;
  id: string;
  owner: string;
  reportingAttendeeId: string;
  reportingAttendee: Attendee;
  reportedAttendeeId: string;
  reportedAttendee: Attendee;
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export enum ReportReason {
  INAPPROPRIATE_MESSAGE = 'INAPPROPRIATE_MESSAGE',
  INAPPROPRIATE_PHOTO = 'INAPPROPRIATE_PHOTO',
  SPAM = 'SPAM',
  OTHER = 'OTHER',
}

export enum ReportStatus {
  SUBMITTED = 'SUBMITTED',
  BANNED = 'BANNED',
  DISMISSED = 'DISMISSED',
}

export type ModelMatchInterestConnection = {
  __typename: 'ModelMatchInterestConnection';
  items: Array<MatchInterest | null>;
  nextToken?: string | null;
};

export type MatchInterest = {
  __typename: 'MatchInterest';
  id: string;
  matchId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendeeId: string;
  match: Match;
  interest: Interest;
  createdAt: string;
  updatedAt: string;
};

export type ModelMatchDesiredIdentifierConnection = {
  __typename: 'ModelMatchDesiredIdentifierConnection';
  items: Array<MatchDesiredIdentifier | null>;
  nextToken?: string | null;
};

export type MatchDesiredIdentifier = {
  __typename: 'MatchDesiredIdentifier';
  id: string;
  matchId: string;
  attendeeId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  match: Match;
  desiredIdentifier: Identifier;
  createdAt: string;
  updatedAt: string;
};

export type ChatThread = {
  __typename: 'ChatThread';
  id: string;
  eventId: string;
  lastMessageAt?: string | null;
  attendee1LastReadAt?: string | null;
  attendee2LastReadAt?: string | null;
  messages?: ModelMessageConnection | null;
  matchId: string;
  match?: Match | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelMessageConnection = {
  __typename: 'ModelMessageConnection';
  items: Array<Message | null>;
  nextToken?: string | null;
};

export type Message = {
  __typename: 'Message';
  id: string;
  content: string;
  createdAt?: string | null;
  owner?: string | null;
  attendeeId: string;
  attendee?: Attendee | null;
  chatThreadId: string;
  chatThread: ChatThread;
  updatedAt: string;
};

export type UpdateAttendeeInput = {
  id: string;
  owner?: string | null;
  userId?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  eventId?: string | null;
  interests?: Array<string> | null;
  desiredIdentifiers?: Array<string> | null;
  ownIdentifiers?: Array<string> | null;
  updatedAt?: string | null;
};

export type UpdateCandidateInput = {
  id: string;
  interests?: Array<string> | null;
  desiredIdentifiers?: Array<string> | null;
  updatedAt?: string | null;
  candidateType: CandidateType;
};

export enum CandidateType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  UNDECIDED = 'UNDECIDED',
}

export type Candidate = {
  __typename: 'Candidate';
  id: string;
  owner: string;
  ownerAttendeeId: string;
  eventId: string;
  event?: Event | null;
  attendeeId: string;
  attendee?: Attendee | null;
  candidateType: CandidateType;
  matchScore: number;
  interests?: ModelCandidateInterestConnection | null;
  desiredIdentifiers?: ModelCandidateDesiredIdentifierConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelCandidateInterestConnection = {
  __typename: 'ModelCandidateInterestConnection';
  items: Array<CandidateInterest | null>;
  nextToken?: string | null;
};

export type CandidateInterest = {
  __typename: 'CandidateInterest';
  id: string;
  candidateId: string;
  interestId: string;
  eventId: string;
  owner: string;
  candidate: Candidate;
  interest: Interest;
  createdAt: string;
  updatedAt: string;
};

export type ModelCandidateDesiredIdentifierConnection = {
  __typename: 'ModelCandidateDesiredIdentifierConnection';
  items: Array<CandidateDesiredIdentifier | null>;
  nextToken?: string | null;
};

export type CandidateDesiredIdentifier = {
  __typename: 'CandidateDesiredIdentifier';
  id: string;
  candidateId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  candidate: Candidate;
  desiredIdentifier: Identifier;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
  id: string;
  owner?: string | null;
  notificationConfig?: NotificationConfigInput | null;
  termsAccepted?: boolean | null;
};

export type NotificationConfigInput = {
  matches?: boolean | null;
  messages?: boolean | null;
  subscribe?: boolean | null;
};

export type ModelUserConditionInput = {
  termsAccepted?: ModelBooleanInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type User = {
  __typename: 'User';
  id: string;
  owner: string;
  notificationConfig?: NotificationConfig | null;
  termsAccepted?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type NotificationConfig = {
  __typename: 'NotificationConfig';
  matches?: boolean | null;
  messages?: boolean | null;
  subscribe?: boolean | null;
};

export type CreateInterestInput = {
  id?: string | null;
  group: string;
  name: string;
};

export type ModelInterestConditionInput = {
  group?: ModelStringInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelInterestConditionInput | null> | null;
  or?: Array<ModelInterestConditionInput | null> | null;
  not?: ModelInterestConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateInterestInput = {
  id: string;
  group?: string | null;
  name?: string | null;
};

export type DeleteInterestInput = {
  id: string;
};

export type CreateIdentifierInput = {
  id?: string | null;
  name: string;
};

export type ModelIdentifierConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelIdentifierConditionInput | null> | null;
  or?: Array<ModelIdentifierConditionInput | null> | null;
  not?: ModelIdentifierConditionInput | null;
};

export type UpdateIdentifierInput = {
  id: string;
  name?: string | null;
};

export type DeleteIdentifierInput = {
  id: string;
};

export type CreateThemeInput = {
  id?: string | null;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

export type ModelThemeConditionInput = {
  name?: ModelStringInput | null;
  primary?: ModelStringInput | null;
  secondary?: ModelStringInput | null;
  tertiary?: ModelStringInput | null;
  and?: Array<ModelThemeConditionInput | null> | null;
  or?: Array<ModelThemeConditionInput | null> | null;
  not?: ModelThemeConditionInput | null;
};

export type UpdateThemeInput = {
  id: string;
  name?: string | null;
  primary?: string | null;
  secondary?: string | null;
  tertiary?: string | null;
};

export type DeleteThemeInput = {
  id: string;
};

export type CreateOrganizationMemberInput = {
  organizationId: string;
  userId: string;
  role: OrganizationMemberRole;
};

export type ModelOrganizationMemberConditionInput = {
  role?: ModelOrganizationMemberRoleInput | null;
  and?: Array<ModelOrganizationMemberConditionInput | null> | null;
  or?: Array<ModelOrganizationMemberConditionInput | null> | null;
  not?: ModelOrganizationMemberConditionInput | null;
};

export type ModelOrganizationMemberRoleInput = {
  eq?: OrganizationMemberRole | null;
  ne?: OrganizationMemberRole | null;
};

export type UpdateOrganizationMemberInput = {
  organizationId: string;
  userId: string;
  role?: OrganizationMemberRole | null;
};

export type DeleteOrganizationMemberInput = {
  organizationId: string;
  userId: string;
};

export type CreateOrganizationInput = {
  id?: string | null;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
};

export type ModelOrganizationConditionInput = {
  name?: ModelStringInput | null;
  website?: ModelStringInput | null;
  facebook?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  linkedin?: ModelStringInput | null;
  and?: Array<ModelOrganizationConditionInput | null> | null;
  or?: Array<ModelOrganizationConditionInput | null> | null;
  not?: ModelOrganizationConditionInput | null;
};

export type UpdateOrganizationInput = {
  id: string;
  owners?: Array<string> | null;
  name?: string | null;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
};

export type DeleteOrganizationInput = {
  id: string;
};

export type CreateEventInput = {
  id?: string | null;
  organizationId: string;
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: EventDateRangeInput;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<EventPaymentsInput> | null;
  eventThemeId?: string | null;
};

export type EventDateRangeInput = {
  startDate: string;
  endDate: string;
};

export type EventPaymentsInput = {
  paymentMethod: OrganizationPaymentMethodInput;
  transactionId: string;
  amount: number;
  receivedAt: string;
};

export type OrganizationPaymentMethodInput = {
  name: string;
  provider: string;
  method: string;
  token: string;
};

export type ModelEventConditionInput = {
  organizationId?: ModelIDInput | null;
  name?: ModelStringInput | null;
  status?: ModelEventStatusInput | null;
  size?: ModelEventSizeInput | null;
  logoUrl?: ModelStringInput | null;
  qrImageUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  registrationCode?: ModelStringInput | null;
  letsChatWithUrl?: ModelStringInput | null;
  website?: ModelStringInput | null;
  facebook?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  maxInterests?: ModelIntInput | null;
  maxIdentifiers?: ModelIntInput | null;
  totalAmountDue?: ModelIntInput | null;
  paymentStatus?: ModelEventPaymentStatusInput | null;
  and?: Array<ModelEventConditionInput | null> | null;
  or?: Array<ModelEventConditionInput | null> | null;
  not?: ModelEventConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelEventStatusInput = {
  eq?: EventStatus | null;
  ne?: EventStatus | null;
};

export type ModelEventSizeInput = {
  eq?: EventSize | null;
  ne?: EventSize | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelEventPaymentStatusInput = {
  eq?: EventPaymentStatus | null;
  ne?: EventPaymentStatus | null;
};

export type UpdateEventInput = {
  id: string;
  organizationId?: string | null;
  owners?: Array<string> | null;
  readers?: Array<string> | null;
  name?: string | null;
  status?: EventStatus | null;
  size?: EventSize | null;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  registrationCode?: string | null;
  letsChatWithUrl?: string | null;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange?: EventDateRangeInput | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<EventPaymentsInput> | null;
  eventThemeId?: string | null;
};

export type DeleteEventInput = {
  id: string;
};

export type CreateEventInterestInput = {
  id?: string | null;
  eventId: string;
  interestId: string;
};

export type ModelEventInterestConditionInput = {
  eventId?: ModelIDInput | null;
  interestId?: ModelIDInput | null;
  and?: Array<ModelEventInterestConditionInput | null> | null;
  or?: Array<ModelEventInterestConditionInput | null> | null;
  not?: ModelEventInterestConditionInput | null;
};

export type UpdateEventInterestInput = {
  id: string;
  eventId?: string | null;
  interestId?: string | null;
};

export type DeleteEventInterestInput = {
  id: string;
};

export type CreateEventIdentifierInput = {
  id?: string | null;
  eventId: string;
  identifierId: string;
};

export type ModelEventIdentifierConditionInput = {
  eventId?: ModelIDInput | null;
  identifierId?: ModelIDInput | null;
  and?: Array<ModelEventIdentifierConditionInput | null> | null;
  or?: Array<ModelEventIdentifierConditionInput | null> | null;
  not?: ModelEventIdentifierConditionInput | null;
};

export type UpdateEventIdentifierInput = {
  id: string;
  eventId?: string | null;
  identifierId?: string | null;
};

export type DeleteEventIdentifierInput = {
  id: string;
};

export type CreateAttendeeInterestInput = {
  id?: string | null;
  attendeeId: string;
  interestId: string;
  eventId: string;
  owner: string;
};

export type ModelAttendeeInterestConditionInput = {
  attendeeId?: ModelIDInput | null;
  interestId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelAttendeeInterestConditionInput | null> | null;
  or?: Array<ModelAttendeeInterestConditionInput | null> | null;
  not?: ModelAttendeeInterestConditionInput | null;
};

export type UpdateAttendeeInterestInput = {
  id: string;
  attendeeId?: string | null;
  interestId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteAttendeeInterestInput = {
  id: string;
};

export type CreateAttendeeDesiredIdentifierInput = {
  id?: string | null;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
};

export type ModelAttendeeDesiredIdentifierConditionInput = {
  attendeeId?: ModelIDInput | null;
  identifierId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelAttendeeDesiredIdentifierConditionInput | null> | null;
  or?: Array<ModelAttendeeDesiredIdentifierConditionInput | null> | null;
  not?: ModelAttendeeDesiredIdentifierConditionInput | null;
};

export type UpdateAttendeeDesiredIdentifierInput = {
  id: string;
  attendeeId?: string | null;
  identifierId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteAttendeeDesiredIdentifierInput = {
  id: string;
};

export type CreateAttendeeOwnIdentifierInput = {
  id?: string | null;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
};

export type ModelAttendeeOwnIdentifierConditionInput = {
  attendeeId?: ModelIDInput | null;
  identifierId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelAttendeeOwnIdentifierConditionInput | null> | null;
  or?: Array<ModelAttendeeOwnIdentifierConditionInput | null> | null;
  not?: ModelAttendeeOwnIdentifierConditionInput | null;
};

export type UpdateAttendeeOwnIdentifierInput = {
  id: string;
  attendeeId?: string | null;
  identifierId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteAttendeeOwnIdentifierInput = {
  id: string;
};

export type CreateReportInput = {
  eventId: string;
  id?: string | null;
  owner: string;
  reportingAttendeeId: string;
  reportedAttendeeId: string;
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
};

export type ModelReportConditionInput = {
  reportingAttendeeId?: ModelIDInput | null;
  reportedAttendeeId?: ModelIDInput | null;
  reason?: ModelReportReasonInput | null;
  message?: ModelStringInput | null;
  status?: ModelReportStatusInput | null;
  and?: Array<ModelReportConditionInput | null> | null;
  or?: Array<ModelReportConditionInput | null> | null;
  not?: ModelReportConditionInput | null;
};

export type ModelReportReasonInput = {
  eq?: ReportReason | null;
  ne?: ReportReason | null;
};

export type ModelReportStatusInput = {
  eq?: ReportStatus | null;
  ne?: ReportStatus | null;
};

export type UpdateReportInput = {
  eventId: string;
  id: string;
  owner?: string | null;
  reportingAttendeeId?: string | null;
  reportedAttendeeId?: string | null;
  reason?: ReportReason | null;
  message?: string | null;
  status?: ReportStatus | null;
};

export type DeleteReportInput = {
  eventId: string;
  id: string;
};

export type UpdateChatThreadInput = {
  id: string;
  eventId?: string | null;
  lastMessageAt?: string | null;
  attendee1LastReadAt?: string | null;
  attendee2LastReadAt?: string | null;
  matchId?: string | null;
};

export type ModelChatThreadConditionInput = {
  eventId?: ModelIDInput | null;
  lastMessageAt?: ModelStringInput | null;
  attendee1LastReadAt?: ModelStringInput | null;
  attendee2LastReadAt?: ModelStringInput | null;
  matchId?: ModelIDInput | null;
  and?: Array<ModelChatThreadConditionInput | null> | null;
  or?: Array<ModelChatThreadConditionInput | null> | null;
  not?: ModelChatThreadConditionInput | null;
};

export type CreateMessageInput = {
  id?: string | null;
  content: string;
  createdAt?: string | null;
  owner?: string | null;
  attendeeId: string;
  chatThreadId: string;
};

export type ModelMessageConditionInput = {
  content?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  attendeeId?: ModelIDInput | null;
  chatThreadId?: ModelIDInput | null;
  and?: Array<ModelMessageConditionInput | null> | null;
  or?: Array<ModelMessageConditionInput | null> | null;
  not?: ModelMessageConditionInput | null;
};

export type DeleteMatchInput = {
  id: string;
};

export type ModelMatchConditionInput = {
  attendee1Id?: ModelIDInput | null;
  attendee2Id?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelMatchConditionInput | null> | null;
  or?: Array<ModelMatchConditionInput | null> | null;
  not?: ModelMatchConditionInput | null;
};

export type CreateCandidateInterestInput = {
  id?: string | null;
  candidateId: string;
  interestId: string;
  eventId: string;
  owner: string;
};

export type ModelCandidateInterestConditionInput = {
  candidateId?: ModelIDInput | null;
  interestId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelCandidateInterestConditionInput | null> | null;
  or?: Array<ModelCandidateInterestConditionInput | null> | null;
  not?: ModelCandidateInterestConditionInput | null;
};

export type UpdateCandidateInterestInput = {
  id: string;
  candidateId?: string | null;
  interestId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteCandidateInterestInput = {
  id: string;
};

export type CreateCandidateDesiredIdentifierInput = {
  id?: string | null;
  candidateId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
};

export type ModelCandidateDesiredIdentifierConditionInput = {
  candidateId?: ModelIDInput | null;
  desiredIdentifierId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelCandidateDesiredIdentifierConditionInput | null> | null;
  or?: Array<ModelCandidateDesiredIdentifierConditionInput | null> | null;
  not?: ModelCandidateDesiredIdentifierConditionInput | null;
};

export type UpdateCandidateDesiredIdentifierInput = {
  id: string;
  candidateId?: string | null;
  desiredIdentifierId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteCandidateDesiredIdentifierInput = {
  id: string;
};

export type CreateMatchInterestInput = {
  id?: string | null;
  matchId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendeeId: string;
};

export type ModelMatchInterestConditionInput = {
  matchId?: ModelIDInput | null;
  interestId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  attendeeId?: ModelIDInput | null;
  and?: Array<ModelMatchInterestConditionInput | null> | null;
  or?: Array<ModelMatchInterestConditionInput | null> | null;
  not?: ModelMatchInterestConditionInput | null;
};

export type UpdateMatchInterestInput = {
  id: string;
  matchId?: string | null;
  interestId?: string | null;
  eventId?: string | null;
  owner?: string | null;
  attendeeId?: string | null;
};

export type DeleteMatchInterestInput = {
  id: string;
};

export type CreateMatchDesiredIdentifierInput = {
  id?: string | null;
  matchId: string;
  attendeeId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
};

export type ModelMatchDesiredIdentifierConditionInput = {
  matchId?: ModelIDInput | null;
  attendeeId?: ModelIDInput | null;
  desiredIdentifierId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  and?: Array<ModelMatchDesiredIdentifierConditionInput | null> | null;
  or?: Array<ModelMatchDesiredIdentifierConditionInput | null> | null;
  not?: ModelMatchDesiredIdentifierConditionInput | null;
};

export type UpdateMatchDesiredIdentifierInput = {
  id: string;
  matchId?: string | null;
  attendeeId?: string | null;
  desiredIdentifierId?: string | null;
  eventId?: string | null;
  owner?: string | null;
};

export type DeleteMatchDesiredIdentifierInput = {
  id: string;
};

export type ModelInterestFilterInput = {
  id?: ModelIDInput | null;
  group?: ModelStringInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelInterestFilterInput | null> | null;
  or?: Array<ModelInterestFilterInput | null> | null;
  not?: ModelInterestFilterInput | null;
};

export type ModelInterestConnection = {
  __typename: 'ModelInterestConnection';
  items: Array<Interest | null>;
  nextToken?: string | null;
};

export type ModelIdentifierFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelIdentifierFilterInput | null> | null;
  or?: Array<ModelIdentifierFilterInput | null> | null;
  not?: ModelIdentifierFilterInput | null;
};

export type ModelIdentifierConnection = {
  __typename: 'ModelIdentifierConnection';
  items: Array<Identifier | null>;
  nextToken?: string | null;
};

export type ModelThemeFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  primary?: ModelStringInput | null;
  secondary?: ModelStringInput | null;
  tertiary?: ModelStringInput | null;
  and?: Array<ModelThemeFilterInput | null> | null;
  or?: Array<ModelThemeFilterInput | null> | null;
  not?: ModelThemeFilterInput | null;
};

export type ModelThemeConnection = {
  __typename: 'ModelThemeConnection';
  items: Array<Theme | null>;
  nextToken?: string | null;
};

export type ModelIDKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelOrganizationMemberFilterInput = {
  organizationId?: ModelIDInput | null;
  userId?: ModelIDInput | null;
  role?: ModelOrganizationMemberRoleInput | null;
  and?: Array<ModelOrganizationMemberFilterInput | null> | null;
  or?: Array<ModelOrganizationMemberFilterInput | null> | null;
  not?: ModelOrganizationMemberFilterInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelOrganizationFilterInput = {
  id?: ModelIDInput | null;
  owners?: ModelStringInput | null;
  name?: ModelStringInput | null;
  website?: ModelStringInput | null;
  facebook?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  linkedin?: ModelStringInput | null;
  and?: Array<ModelOrganizationFilterInput | null> | null;
  or?: Array<ModelOrganizationFilterInput | null> | null;
  not?: ModelOrganizationFilterInput | null;
};

export type ModelOrganizationConnection = {
  __typename: 'ModelOrganizationConnection';
  items: Array<Organization | null>;
  nextToken?: string | null;
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null;
  organizationId?: ModelIDInput | null;
  owners?: ModelStringInput | null;
  readers?: ModelIDInput | null;
  name?: ModelStringInput | null;
  status?: ModelEventStatusInput | null;
  size?: ModelEventSizeInput | null;
  logoUrl?: ModelStringInput | null;
  qrImageUrl?: ModelStringInput | null;
  description?: ModelStringInput | null;
  registrationCode?: ModelStringInput | null;
  letsChatWithUrl?: ModelStringInput | null;
  website?: ModelStringInput | null;
  facebook?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  maxInterests?: ModelIntInput | null;
  maxIdentifiers?: ModelIntInput | null;
  totalAmountDue?: ModelIntInput | null;
  paymentStatus?: ModelEventPaymentStatusInput | null;
  and?: Array<ModelEventFilterInput | null> | null;
  or?: Array<ModelEventFilterInput | null> | null;
  not?: ModelEventFilterInput | null;
};

export type ModelAttendeeFilterInput = {
  id?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  userId?: ModelIDInput | null;
  fullName?: ModelStringInput | null;
  avatarUrl?: ModelStringInput | null;
  title?: ModelStringInput | null;
  company?: ModelStringInput | null;
  pronouns?: ModelStringInput | null;
  bio?: ModelStringInput | null;
  newsletterSubscribed?: ModelBooleanInput | null;
  linkedin?: ModelStringInput | null;
  twitter?: ModelStringInput | null;
  facebook?: ModelStringInput | null;
  eventId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelAttendeeFilterInput | null> | null;
  or?: Array<ModelAttendeeFilterInput | null> | null;
  not?: ModelAttendeeFilterInput | null;
};

export type ModelReportFilterInput = {
  eventId?: ModelIDInput | null;
  id?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  reportingAttendeeId?: ModelIDInput | null;
  reportedAttendeeId?: ModelIDInput | null;
  reason?: ModelReportReasonInput | null;
  message?: ModelStringInput | null;
  status?: ModelReportStatusInput | null;
  and?: Array<ModelReportFilterInput | null> | null;
  or?: Array<ModelReportFilterInput | null> | null;
  not?: ModelReportFilterInput | null;
};

export type ModelChatThreadFilterInput = {
  id?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  lastMessageAt?: ModelStringInput | null;
  attendee1LastReadAt?: ModelStringInput | null;
  attendee2LastReadAt?: ModelStringInput | null;
  matchId?: ModelIDInput | null;
  and?: Array<ModelChatThreadFilterInput | null> | null;
  or?: Array<ModelChatThreadFilterInput | null> | null;
  not?: ModelChatThreadFilterInput | null;
};

export type ModelChatThreadConnection = {
  __typename: 'ModelChatThreadConnection';
  items: Array<ChatThread | null>;
  nextToken?: string | null;
};

export type ModelCandidateFilterInput = {
  id?: ModelIDInput | null;
  owner?: ModelStringInput | null;
  ownerAttendeeId?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  attendeeId?: ModelIDInput | null;
  candidateType?: ModelCandidateTypeInput | null;
  matchScore?: ModelIntInput | null;
  and?: Array<ModelCandidateFilterInput | null> | null;
  or?: Array<ModelCandidateFilterInput | null> | null;
  not?: ModelCandidateFilterInput | null;
};

export type ModelCandidateTypeInput = {
  eq?: CandidateType | null;
  ne?: CandidateType | null;
};

export type ModelCandidateConnection = {
  __typename: 'ModelCandidateConnection';
  items: Array<Candidate | null>;
  nextToken?: string | null;
};

export type ModelMatchFilterInput = {
  id?: ModelIDInput | null;
  owners?: ModelStringInput | null;
  attendee1Id?: ModelIDInput | null;
  attendee2Id?: ModelIDInput | null;
  eventId?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelMatchFilterInput | null> | null;
  or?: Array<ModelMatchFilterInput | null> | null;
  not?: ModelMatchFilterInput | null;
};

export type ModelMatchConnection = {
  __typename: 'ModelMatchConnection';
  items: Array<Match | null>;
  nextToken?: string | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  owner?: ModelIDInput | null;
  termsAccepted?: ModelBooleanInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: 'ModelUserConnection';
  items: Array<User | null>;
  nextToken?: string | null;
};

export type ModelIntKeyConditionInput = {
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type CreateAttendeeMutation = {
  __typename: 'Attendee';
  id: string;
  owner?: string | null;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  interests?: {
    __typename: 'ModelAttendeeInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelAttendeeDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  ownIdentifiers?: {
    __typename: 'ModelAttendeeOwnIdentifierConnection';
    nextToken?: string | null;
  } | null;
  eventId: string;
  attendeeMatches?: Array<{
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  attendeeChats?: Array<{
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAttendeeMutation = {
  __typename: 'Attendee';
  id: string;
  owner?: string | null;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  interests?: {
    __typename: 'ModelAttendeeInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelAttendeeDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  ownIdentifiers?: {
    __typename: 'ModelAttendeeOwnIdentifierConnection';
    nextToken?: string | null;
  } | null;
  eventId: string;
  attendeeMatches?: Array<{
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  attendeeChats?: Array<{
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCandidateMutation = {
  __typename: 'Candidate';
  id: string;
  owner: string;
  ownerAttendeeId: string;
  eventId: string;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  attendeeId: string;
  attendee?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  candidateType: CandidateType;
  matchScore: number;
  interests?: {
    __typename: 'ModelCandidateInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelCandidateDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserMutation = {
  __typename: 'User';
  id: string;
  owner: string;
  notificationConfig?: {
    __typename: 'NotificationConfig';
    matches?: boolean | null;
    messages?: boolean | null;
    subscribe?: boolean | null;
  } | null;
  termsAccepted?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateInterestMutation = {
  __typename: 'Interest';
  id: string;
  group: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateInterestMutation = {
  __typename: 'Interest';
  id: string;
  group: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteInterestMutation = {
  __typename: 'Interest';
  id: string;
  group: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateIdentifierMutation = {
  __typename: 'Identifier';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateIdentifierMutation = {
  __typename: 'Identifier';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteIdentifierMutation = {
  __typename: 'Identifier';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateThemeMutation = {
  __typename: 'Theme';
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateThemeMutation = {
  __typename: 'Theme';
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteThemeMutation = {
  __typename: 'Theme';
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganizationMemberMutation = {
  __typename: 'OrganizationMember';
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
  role: OrganizationMemberRole;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrganizationMemberMutation = {
  __typename: 'OrganizationMember';
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
  role: OrganizationMemberRole;
  createdAt: string;
  updatedAt: string;
};

export type DeleteOrganizationMemberMutation = {
  __typename: 'OrganizationMember';
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
  role: OrganizationMemberRole;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrganizationMutation = {
  __typename: 'Organization';
  id: string;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  events?: {
    __typename: 'ModelEventConnection';
    nextToken?: string | null;
  } | null;
  members?: {
    __typename: 'ModelOrganizationMemberConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrganizationMutation = {
  __typename: 'Organization';
  id: string;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  events?: {
    __typename: 'ModelEventConnection';
    nextToken?: string | null;
  } | null;
  members?: {
    __typename: 'ModelOrganizationMemberConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteOrganizationMutation = {
  __typename: 'Organization';
  id: string;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  events?: {
    __typename: 'ModelEventConnection';
    nextToken?: string | null;
  } | null;
  members?: {
    __typename: 'ModelOrganizationMemberConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventMutation = {
  __typename: 'Event';
  id: string;
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  theme?: {
    __typename: 'Theme';
    id: string;
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: {
    __typename: 'EventDateRange';
    startDate: string;
    endDate: string;
  };
  interests?: {
    __typename: 'ModelEventInterestConnection';
    nextToken?: string | null;
  } | null;
  identifiers?: {
    __typename: 'ModelEventIdentifierConnection';
    nextToken?: string | null;
  } | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<{
    __typename: 'EventPayments';
    transactionId: string;
    amount: number;
    receivedAt: string;
  }> | null;
  attendees?: {
    __typename: 'ModelAttendeeConnection';
    nextToken?: string | null;
  } | null;
  reports?: {
    __typename: 'ModelReportConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateEventMutation = {
  __typename: 'Event';
  id: string;
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  theme?: {
    __typename: 'Theme';
    id: string;
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: {
    __typename: 'EventDateRange';
    startDate: string;
    endDate: string;
  };
  interests?: {
    __typename: 'ModelEventInterestConnection';
    nextToken?: string | null;
  } | null;
  identifiers?: {
    __typename: 'ModelEventIdentifierConnection';
    nextToken?: string | null;
  } | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<{
    __typename: 'EventPayments';
    transactionId: string;
    amount: number;
    receivedAt: string;
  }> | null;
  attendees?: {
    __typename: 'ModelAttendeeConnection';
    nextToken?: string | null;
  } | null;
  reports?: {
    __typename: 'ModelReportConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteEventMutation = {
  __typename: 'Event';
  id: string;
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  theme?: {
    __typename: 'Theme';
    id: string;
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: {
    __typename: 'EventDateRange';
    startDate: string;
    endDate: string;
  };
  interests?: {
    __typename: 'ModelEventInterestConnection';
    nextToken?: string | null;
  } | null;
  identifiers?: {
    __typename: 'ModelEventIdentifierConnection';
    nextToken?: string | null;
  } | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<{
    __typename: 'EventPayments';
    transactionId: string;
    amount: number;
    receivedAt: string;
  }> | null;
  attendees?: {
    __typename: 'ModelAttendeeConnection';
    nextToken?: string | null;
  } | null;
  reports?: {
    __typename: 'ModelReportConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateEventInterestMutation = {
  __typename: 'EventInterest';
  id: string;
  eventId: string;
  interestId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateEventInterestMutation = {
  __typename: 'EventInterest';
  id: string;
  eventId: string;
  interestId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteEventInterestMutation = {
  __typename: 'EventInterest';
  id: string;
  eventId: string;
  interestId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateEventIdentifierMutation = {
  __typename: 'EventIdentifier';
  id: string;
  eventId: string;
  identifierId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateEventIdentifierMutation = {
  __typename: 'EventIdentifier';
  id: string;
  eventId: string;
  identifierId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteEventIdentifierMutation = {
  __typename: 'EventIdentifier';
  id: string;
  eventId: string;
  identifierId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateAttendeeInterestMutation = {
  __typename: 'AttendeeInterest';
  id: string;
  attendeeId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateAttendeeInterestMutation = {
  __typename: 'AttendeeInterest';
  id: string;
  attendeeId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteAttendeeInterestMutation = {
  __typename: 'AttendeeInterest';
  id: string;
  attendeeId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateAttendeeDesiredIdentifierMutation = {
  __typename: 'AttendeeDesiredIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateAttendeeDesiredIdentifierMutation = {
  __typename: 'AttendeeDesiredIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteAttendeeDesiredIdentifierMutation = {
  __typename: 'AttendeeDesiredIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateAttendeeOwnIdentifierMutation = {
  __typename: 'AttendeeOwnIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateAttendeeOwnIdentifierMutation = {
  __typename: 'AttendeeOwnIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteAttendeeOwnIdentifierMutation = {
  __typename: 'AttendeeOwnIdentifier';
  id: string;
  attendeeId: string;
  identifierId: string;
  eventId: string;
  owner: string;
  attendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  identifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateReportMutation = {
  __typename: 'Report';
  eventId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  owner: string;
  reportingAttendeeId: string;
  reportingAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reportedAttendeeId: string;
  reportedAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export type UpdateReportMutation = {
  __typename: 'Report';
  eventId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  owner: string;
  reportingAttendeeId: string;
  reportingAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reportedAttendeeId: string;
  reportedAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export type DeleteReportMutation = {
  __typename: 'Report';
  eventId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  owner: string;
  reportingAttendeeId: string;
  reportingAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reportedAttendeeId: string;
  reportedAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export type UpdateChatThreadMutation = {
  __typename: 'ChatThread';
  id: string;
  eventId: string;
  lastMessageAt?: string | null;
  attendee1LastReadAt?: string | null;
  attendee2LastReadAt?: string | null;
  messages?: {
    __typename: 'ModelMessageConnection';
    nextToken?: string | null;
  } | null;
  matchId: string;
  match?: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateMessageMutation = {
  __typename: 'Message';
  id: string;
  content: string;
  createdAt?: string | null;
  owner?: string | null;
  attendeeId: string;
  attendee?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  chatThreadId: string;
  chatThread: {
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  };
  updatedAt: string;
};

export type DeleteMatchMutation = {
  __typename: 'Match';
  id: string;
  owners: Array<string>;
  attendee1Id: string;
  attendee2Id: string;
  eventId: string;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  attendee1?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  attendee2?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  interests?: {
    __typename: 'ModelMatchInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelMatchDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  updatedAt: string;
};

export type CreateCandidateInterestMutation = {
  __typename: 'CandidateInterest';
  id: string;
  candidateId: string;
  interestId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateCandidateInterestMutation = {
  __typename: 'CandidateInterest';
  id: string;
  candidateId: string;
  interestId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteCandidateInterestMutation = {
  __typename: 'CandidateInterest';
  id: string;
  candidateId: string;
  interestId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateCandidateDesiredIdentifierMutation = {
  __typename: 'CandidateDesiredIdentifier';
  id: string;
  candidateId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateCandidateDesiredIdentifierMutation = {
  __typename: 'CandidateDesiredIdentifier';
  id: string;
  candidateId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteCandidateDesiredIdentifierMutation = {
  __typename: 'CandidateDesiredIdentifier';
  id: string;
  candidateId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  candidate: {
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateMatchInterestMutation = {
  __typename: 'MatchInterest';
  id: string;
  matchId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendeeId: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateMatchInterestMutation = {
  __typename: 'MatchInterest';
  id: string;
  matchId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendeeId: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteMatchInterestMutation = {
  __typename: 'MatchInterest';
  id: string;
  matchId: string;
  interestId: string;
  eventId: string;
  owner: string;
  attendeeId: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  interest: {
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateMatchDesiredIdentifierMutation = {
  __typename: 'MatchDesiredIdentifier';
  id: string;
  matchId: string;
  attendeeId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateMatchDesiredIdentifierMutation = {
  __typename: 'MatchDesiredIdentifier';
  id: string;
  matchId: string;
  attendeeId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteMatchDesiredIdentifierMutation = {
  __typename: 'MatchDesiredIdentifier';
  id: string;
  matchId: string;
  attendeeId: string;
  desiredIdentifierId: string;
  eventId: string;
  owner: string;
  match: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  desiredIdentifier: {
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetUserQuery = {
  __typename: 'User';
  id: string;
  owner: string;
  notificationConfig?: {
    __typename: 'NotificationConfig';
    matches?: boolean | null;
    messages?: boolean | null;
    subscribe?: boolean | null;
  } | null;
  termsAccepted?: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type GetInterestQuery = {
  __typename: 'Interest';
  id: string;
  group: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ListInterestsQuery = {
  __typename: 'ModelInterestConnection';
  items: Array<{
    __typename: 'Interest';
    id: string;
    group: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetIdentifierQuery = {
  __typename: 'Identifier';
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ListIdentifiersQuery = {
  __typename: 'ModelIdentifierConnection';
  items: Array<{
    __typename: 'Identifier';
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetThemeQuery = {
  __typename: 'Theme';
  id: string;
  name: string;
  primary: string;
  secondary: string;
  tertiary: string;
  createdAt: string;
  updatedAt: string;
};

export type ListThemesQuery = {
  __typename: 'ModelThemeConnection';
  items: Array<{
    __typename: 'Theme';
    id: string;
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetOrganizationMemberQuery = {
  __typename: 'OrganizationMember';
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
  role: OrganizationMemberRole;
  createdAt: string;
  updatedAt: string;
};

export type ListOrganizationMembersQuery = {
  __typename: 'ModelOrganizationMemberConnection';
  items: Array<{
    __typename: 'OrganizationMember';
    organizationId: string;
    userId: string;
    role: OrganizationMemberRole;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetOrganizationQuery = {
  __typename: 'Organization';
  id: string;
  owners: Array<string>;
  name: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  events?: {
    __typename: 'ModelEventConnection';
    nextToken?: string | null;
  } | null;
  members?: {
    __typename: 'ModelOrganizationMemberConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListOrganizationsQuery = {
  __typename: 'ModelOrganizationConnection';
  items: Array<{
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetEventQuery = {
  __typename: 'Event';
  id: string;
  organizationId: string;
  organization: {
    __typename: 'Organization';
    id: string;
    owners: Array<string>;
    name: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  owners: Array<string>;
  readers?: Array<string> | null;
  name: string;
  status: EventStatus;
  size: EventSize;
  logoUrl?: string | null;
  qrImageUrl?: string | null;
  description?: string | null;
  theme?: {
    __typename: 'Theme';
    id: string;
    name: string;
    primary: string;
    secondary: string;
    tertiary: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  registrationCode?: string | null;
  letsChatWithUrl: string;
  website?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  dateRange: {
    __typename: 'EventDateRange';
    startDate: string;
    endDate: string;
  };
  interests?: {
    __typename: 'ModelEventInterestConnection';
    nextToken?: string | null;
  } | null;
  identifiers?: {
    __typename: 'ModelEventIdentifierConnection';
    nextToken?: string | null;
  } | null;
  maxInterests?: number | null;
  maxIdentifiers?: number | null;
  totalAmountDue?: number | null;
  paymentStatus?: EventPaymentStatus | null;
  payments?: Array<{
    __typename: 'EventPayments';
    transactionId: string;
    amount: number;
    receivedAt: string;
  }> | null;
  attendees?: {
    __typename: 'ModelAttendeeConnection';
    nextToken?: string | null;
  } | null;
  reports?: {
    __typename: 'ModelReportConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListEventsQuery = {
  __typename: 'ModelEventConnection';
  items: Array<{
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetAttendeeQuery = {
  __typename: 'Attendee';
  id: string;
  owner?: string | null;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  title?: string | null;
  company?: string | null;
  pronouns?: string | null;
  bio?: string | null;
  newsletterSubscribed?: boolean | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  interests?: {
    __typename: 'ModelAttendeeInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelAttendeeDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  ownIdentifiers?: {
    __typename: 'ModelAttendeeOwnIdentifierConnection';
    nextToken?: string | null;
  } | null;
  eventId: string;
  attendeeMatches?: Array<{
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  attendeeChats?: Array<{
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListAttendeesQuery = {
  __typename: 'ModelAttendeeConnection';
  items: Array<{
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetReportQuery = {
  __typename: 'Report';
  eventId: string;
  event: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  owner: string;
  reportingAttendeeId: string;
  reportingAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reportedAttendeeId: string;
  reportedAttendee: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  };
  reason: ReportReason;
  message?: string | null;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
};

export type ListReportsQuery = {
  __typename: 'ModelReportConnection';
  items: Array<{
    __typename: 'Report';
    eventId: string;
    id: string;
    owner: string;
    reportingAttendeeId: string;
    reportedAttendeeId: string;
    reason: ReportReason;
    message?: string | null;
    status: ReportStatus;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetChatThreadQuery = {
  __typename: 'ChatThread';
  id: string;
  eventId: string;
  lastMessageAt?: string | null;
  attendee1LastReadAt?: string | null;
  attendee2LastReadAt?: string | null;
  messages?: {
    __typename: 'ModelMessageConnection';
    nextToken?: string | null;
  } | null;
  matchId: string;
  match?: {
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListChatThreadsQuery = {
  __typename: 'ModelChatThreadConnection';
  items: Array<{
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCandidateQuery = {
  __typename: 'Candidate';
  id: string;
  owner: string;
  ownerAttendeeId: string;
  eventId: string;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  attendeeId: string;
  attendee?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  candidateType: CandidateType;
  matchScore: number;
  interests?: {
    __typename: 'ModelCandidateInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelCandidateDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCandidatesQuery = {
  __typename: 'ModelCandidateConnection';
  items: Array<{
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetMatchQuery = {
  __typename: 'Match';
  id: string;
  owners: Array<string>;
  attendee1Id: string;
  attendee2Id: string;
  eventId: string;
  event?: {
    __typename: 'Event';
    id: string;
    organizationId: string;
    owners: Array<string>;
    readers?: Array<string> | null;
    name: string;
    status: EventStatus;
    size: EventSize;
    logoUrl?: string | null;
    qrImageUrl?: string | null;
    description?: string | null;
    registrationCode?: string | null;
    letsChatWithUrl: string;
    website?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    maxInterests?: number | null;
    maxIdentifiers?: number | null;
    totalAmountDue?: number | null;
    paymentStatus?: EventPaymentStatus | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  attendee1?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  attendee2?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  interests?: {
    __typename: 'ModelMatchInterestConnection';
    nextToken?: string | null;
  } | null;
  desiredIdentifiers?: {
    __typename: 'ModelMatchDesiredIdentifierConnection';
    nextToken?: string | null;
  } | null;
  updatedAt: string;
};

export type ListMatchesQuery = {
  __typename: 'ModelMatchConnection';
  items: Array<{
    __typename: 'Match';
    id: string;
    owners: Array<string>;
    attendee1Id: string;
    attendee2Id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUserByOwnerQuery = {
  __typename: 'ModelUserConnection';
  items: Array<{
    __typename: 'User';
    id: string;
    owner: string;
    termsAccepted?: boolean | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type CandidatesByEventIdQuery = {
  __typename: 'ModelCandidateConnection';
  items: Array<{
    __typename: 'Candidate';
    id: string;
    owner: string;
    ownerAttendeeId: string;
    eventId: string;
    attendeeId: string;
    candidateType: CandidateType;
    matchScore: number;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateMessageSubscription = {
  __typename: 'Message';
  id: string;
  content: string;
  createdAt?: string | null;
  owner?: string | null;
  attendeeId: string;
  attendee?: {
    __typename: 'Attendee';
    id: string;
    owner?: string | null;
    userId: string;
    fullName: string;
    avatarUrl?: string | null;
    title?: string | null;
    company?: string | null;
    pronouns?: string | null;
    bio?: string | null;
    newsletterSubscribed?: boolean | null;
    linkedin?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    eventId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  chatThreadId: string;
  chatThread: {
    __typename: 'ChatThread';
    id: string;
    eventId: string;
    lastMessageAt?: string | null;
    attendee1LastReadAt?: string | null;
    attendee2LastReadAt?: string | null;
    matchId: string;
    createdAt: string;
    updatedAt: string;
  };
  updatedAt: string;
};

@Injectable({
  providedIn: 'root',
})
export class APIService {
  async AccessEvent(letsChatWithUrl?: string): Promise<string | null> {
    const statement = `mutation AccessEvent($letsChatWithUrl: String) {
        accessEvent(letsChatWithUrl: $letsChatWithUrl)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (letsChatWithUrl) {
      gqlAPIServiceArguments.letsChatWithUrl = letsChatWithUrl;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.accessEvent;
  }
  async FileUpload(
    bucketFolder?: string,
    fileName?: string,
    base64?: string
  ): Promise<string | null> {
    const statement = `mutation FileUpload($bucketFolder: String, $fileName: String, $base64: String) {
        fileUpload(bucketFolder: $bucketFolder, fileName: $fileName, base64: $base64)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (bucketFolder) {
      gqlAPIServiceArguments.bucketFolder = bucketFolder;
    }
    if (fileName) {
      gqlAPIServiceArguments.fileName = fileName;
    }
    if (base64) {
      gqlAPIServiceArguments.base64 = base64;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.fileUpload;
  }
  async CreateAttendee(input: CreateAttendeeInput): Promise<CreateAttendeeMutation> {
    const statement = `mutation CreateAttendee($input: CreateAttendeeInput!) {
        createAttendee(input: $input) {
          __typename
          id
          owner
          userId
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
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          ownIdentifiers {
            __typename
            nextToken
          }
          eventId
          attendeeMatches {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          attendeeChats {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAttendeeMutation>response.data.createAttendee;
  }
  async UpdateAttendee(input: UpdateAttendeeInput): Promise<UpdateAttendeeMutation> {
    const statement = `mutation UpdateAttendee($input: UpdateAttendeeInput!) {
        updateAttendee(input: $input) {
          __typename
          id
          owner
          userId
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
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          ownIdentifiers {
            __typename
            nextToken
          }
          eventId
          attendeeMatches {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          attendeeChats {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAttendeeMutation>response.data.updateAttendee;
  }
  async UpdateCandidate(input: UpdateCandidateInput): Promise<UpdateCandidateMutation> {
    const statement = `mutation UpdateCandidate($input: UpdateCandidateInput!) {
        updateCandidate(input: $input) {
          __typename
          id
          owner
          ownerAttendeeId
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          attendeeId
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          candidateType
          matchScore
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCandidateMutation>response.data.updateCandidate;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          owner
          notificationConfig {
            __typename
            matches
            messages
            subscribe
          }
          termsAccepted
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async CreateInterest(
    input: CreateInterestInput,
    condition?: ModelInterestConditionInput
  ): Promise<CreateInterestMutation> {
    const statement = `mutation CreateInterest($input: CreateInterestInput!, $condition: ModelInterestConditionInput) {
        createInterest(input: $input, condition: $condition) {
          __typename
          id
          group
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateInterestMutation>response.data.createInterest;
  }
  async UpdateInterest(
    input: UpdateInterestInput,
    condition?: ModelInterestConditionInput
  ): Promise<UpdateInterestMutation> {
    const statement = `mutation UpdateInterest($input: UpdateInterestInput!, $condition: ModelInterestConditionInput) {
        updateInterest(input: $input, condition: $condition) {
          __typename
          id
          group
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateInterestMutation>response.data.updateInterest;
  }
  async DeleteInterest(
    input: DeleteInterestInput,
    condition?: ModelInterestConditionInput
  ): Promise<DeleteInterestMutation> {
    const statement = `mutation DeleteInterest($input: DeleteInterestInput!, $condition: ModelInterestConditionInput) {
        deleteInterest(input: $input, condition: $condition) {
          __typename
          id
          group
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteInterestMutation>response.data.deleteInterest;
  }
  async CreateIdentifier(
    input: CreateIdentifierInput,
    condition?: ModelIdentifierConditionInput
  ): Promise<CreateIdentifierMutation> {
    const statement = `mutation CreateIdentifier($input: CreateIdentifierInput!, $condition: ModelIdentifierConditionInput) {
        createIdentifier(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateIdentifierMutation>response.data.createIdentifier;
  }
  async UpdateIdentifier(
    input: UpdateIdentifierInput,
    condition?: ModelIdentifierConditionInput
  ): Promise<UpdateIdentifierMutation> {
    const statement = `mutation UpdateIdentifier($input: UpdateIdentifierInput!, $condition: ModelIdentifierConditionInput) {
        updateIdentifier(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateIdentifierMutation>response.data.updateIdentifier;
  }
  async DeleteIdentifier(
    input: DeleteIdentifierInput,
    condition?: ModelIdentifierConditionInput
  ): Promise<DeleteIdentifierMutation> {
    const statement = `mutation DeleteIdentifier($input: DeleteIdentifierInput!, $condition: ModelIdentifierConditionInput) {
        deleteIdentifier(input: $input, condition: $condition) {
          __typename
          id
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteIdentifierMutation>response.data.deleteIdentifier;
  }
  async CreateTheme(
    input: CreateThemeInput,
    condition?: ModelThemeConditionInput
  ): Promise<CreateThemeMutation> {
    const statement = `mutation CreateTheme($input: CreateThemeInput!, $condition: ModelThemeConditionInput) {
        createTheme(input: $input, condition: $condition) {
          __typename
          id
          name
          primary
          secondary
          tertiary
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateThemeMutation>response.data.createTheme;
  }
  async UpdateTheme(
    input: UpdateThemeInput,
    condition?: ModelThemeConditionInput
  ): Promise<UpdateThemeMutation> {
    const statement = `mutation UpdateTheme($input: UpdateThemeInput!, $condition: ModelThemeConditionInput) {
        updateTheme(input: $input, condition: $condition) {
          __typename
          id
          name
          primary
          secondary
          tertiary
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateThemeMutation>response.data.updateTheme;
  }
  async DeleteTheme(
    input: DeleteThemeInput,
    condition?: ModelThemeConditionInput
  ): Promise<DeleteThemeMutation> {
    const statement = `mutation DeleteTheme($input: DeleteThemeInput!, $condition: ModelThemeConditionInput) {
        deleteTheme(input: $input, condition: $condition) {
          __typename
          id
          name
          primary
          secondary
          tertiary
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteThemeMutation>response.data.deleteTheme;
  }
  async CreateOrganizationMember(
    input: CreateOrganizationMemberInput,
    condition?: ModelOrganizationMemberConditionInput
  ): Promise<CreateOrganizationMemberMutation> {
    const statement = `mutation CreateOrganizationMember($input: CreateOrganizationMemberInput!, $condition: ModelOrganizationMemberConditionInput) {
        createOrganizationMember(input: $input, condition: $condition) {
          __typename
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          userId
          role
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateOrganizationMemberMutation>response.data.createOrganizationMember;
  }
  async UpdateOrganizationMember(
    input: UpdateOrganizationMemberInput,
    condition?: ModelOrganizationMemberConditionInput
  ): Promise<UpdateOrganizationMemberMutation> {
    const statement = `mutation UpdateOrganizationMember($input: UpdateOrganizationMemberInput!, $condition: ModelOrganizationMemberConditionInput) {
        updateOrganizationMember(input: $input, condition: $condition) {
          __typename
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          userId
          role
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateOrganizationMemberMutation>response.data.updateOrganizationMember;
  }
  async DeleteOrganizationMember(
    input: DeleteOrganizationMemberInput,
    condition?: ModelOrganizationMemberConditionInput
  ): Promise<DeleteOrganizationMemberMutation> {
    const statement = `mutation DeleteOrganizationMember($input: DeleteOrganizationMemberInput!, $condition: ModelOrganizationMemberConditionInput) {
        deleteOrganizationMember(input: $input, condition: $condition) {
          __typename
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          userId
          role
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteOrganizationMemberMutation>response.data.deleteOrganizationMember;
  }
  async CreateOrganization(
    input: CreateOrganizationInput,
    condition?: ModelOrganizationConditionInput
  ): Promise<CreateOrganizationMutation> {
    const statement = `mutation CreateOrganization($input: CreateOrganizationInput!, $condition: ModelOrganizationConditionInput) {
        createOrganization(input: $input, condition: $condition) {
          __typename
          id
          owners
          name
          website
          facebook
          twitter
          linkedin
          events {
            __typename
            nextToken
          }
          members {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateOrganizationMutation>response.data.createOrganization;
  }
  async UpdateOrganization(
    input: UpdateOrganizationInput,
    condition?: ModelOrganizationConditionInput
  ): Promise<UpdateOrganizationMutation> {
    const statement = `mutation UpdateOrganization($input: UpdateOrganizationInput!, $condition: ModelOrganizationConditionInput) {
        updateOrganization(input: $input, condition: $condition) {
          __typename
          id
          owners
          name
          website
          facebook
          twitter
          linkedin
          events {
            __typename
            nextToken
          }
          members {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateOrganizationMutation>response.data.updateOrganization;
  }
  async DeleteOrganization(
    input: DeleteOrganizationInput,
    condition?: ModelOrganizationConditionInput
  ): Promise<DeleteOrganizationMutation> {
    const statement = `mutation DeleteOrganization($input: DeleteOrganizationInput!, $condition: ModelOrganizationConditionInput) {
        deleteOrganization(input: $input, condition: $condition) {
          __typename
          id
          owners
          name
          website
          facebook
          twitter
          linkedin
          events {
            __typename
            nextToken
          }
          members {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteOrganizationMutation>response.data.deleteOrganization;
  }
  async CreateEvent(
    input: CreateEventInput,
    condition?: ModelEventConditionInput
  ): Promise<CreateEventMutation> {
    const statement = `mutation CreateEvent($input: CreateEventInput!, $condition: ModelEventConditionInput) {
        createEvent(input: $input, condition: $condition) {
          __typename
          id
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          owners
          readers
          name
          status
          size
          logoUrl
          qrImageUrl
          description
          theme {
            __typename
            id
            name
            primary
            secondary
            tertiary
            createdAt
            updatedAt
          }
          registrationCode
          letsChatWithUrl
          website
          facebook
          twitter
          dateRange {
            __typename
            startDate
            endDate
          }
          interests {
            __typename
            nextToken
          }
          identifiers {
            __typename
            nextToken
          }
          maxInterests
          maxIdentifiers
          totalAmountDue
          paymentStatus
          payments {
            __typename
            transactionId
            amount
            receivedAt
          }
          attendees {
            __typename
            nextToken
          }
          reports {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateEventMutation>response.data.createEvent;
  }
  async UpdateEvent(
    input: UpdateEventInput,
    condition?: ModelEventConditionInput
  ): Promise<UpdateEventMutation> {
    const statement = `mutation UpdateEvent($input: UpdateEventInput!, $condition: ModelEventConditionInput) {
        updateEvent(input: $input, condition: $condition) {
          __typename
          id
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          owners
          readers
          name
          status
          size
          logoUrl
          qrImageUrl
          description
          theme {
            __typename
            id
            name
            primary
            secondary
            tertiary
            createdAt
            updatedAt
          }
          registrationCode
          letsChatWithUrl
          website
          facebook
          twitter
          dateRange {
            __typename
            startDate
            endDate
          }
          interests {
            __typename
            nextToken
          }
          identifiers {
            __typename
            nextToken
          }
          maxInterests
          maxIdentifiers
          totalAmountDue
          paymentStatus
          payments {
            __typename
            transactionId
            amount
            receivedAt
          }
          attendees {
            __typename
            nextToken
          }
          reports {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateEventMutation>response.data.updateEvent;
  }
  async DeleteEvent(
    input: DeleteEventInput,
    condition?: ModelEventConditionInput
  ): Promise<DeleteEventMutation> {
    const statement = `mutation DeleteEvent($input: DeleteEventInput!, $condition: ModelEventConditionInput) {
        deleteEvent(input: $input, condition: $condition) {
          __typename
          id
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          owners
          readers
          name
          status
          size
          logoUrl
          qrImageUrl
          description
          theme {
            __typename
            id
            name
            primary
            secondary
            tertiary
            createdAt
            updatedAt
          }
          registrationCode
          letsChatWithUrl
          website
          facebook
          twitter
          dateRange {
            __typename
            startDate
            endDate
          }
          interests {
            __typename
            nextToken
          }
          identifiers {
            __typename
            nextToken
          }
          maxInterests
          maxIdentifiers
          totalAmountDue
          paymentStatus
          payments {
            __typename
            transactionId
            amount
            receivedAt
          }
          attendees {
            __typename
            nextToken
          }
          reports {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteEventMutation>response.data.deleteEvent;
  }
  async CreateEventInterest(
    input: CreateEventInterestInput,
    condition?: ModelEventInterestConditionInput
  ): Promise<CreateEventInterestMutation> {
    const statement = `mutation CreateEventInterest($input: CreateEventInterestInput!, $condition: ModelEventInterestConditionInput) {
        createEventInterest(input: $input, condition: $condition) {
          __typename
          id
          eventId
          interestId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateEventInterestMutation>response.data.createEventInterest;
  }
  async UpdateEventInterest(
    input: UpdateEventInterestInput,
    condition?: ModelEventInterestConditionInput
  ): Promise<UpdateEventInterestMutation> {
    const statement = `mutation UpdateEventInterest($input: UpdateEventInterestInput!, $condition: ModelEventInterestConditionInput) {
        updateEventInterest(input: $input, condition: $condition) {
          __typename
          id
          eventId
          interestId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateEventInterestMutation>response.data.updateEventInterest;
  }
  async DeleteEventInterest(
    input: DeleteEventInterestInput,
    condition?: ModelEventInterestConditionInput
  ): Promise<DeleteEventInterestMutation> {
    const statement = `mutation DeleteEventInterest($input: DeleteEventInterestInput!, $condition: ModelEventInterestConditionInput) {
        deleteEventInterest(input: $input, condition: $condition) {
          __typename
          id
          eventId
          interestId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteEventInterestMutation>response.data.deleteEventInterest;
  }
  async CreateEventIdentifier(
    input: CreateEventIdentifierInput,
    condition?: ModelEventIdentifierConditionInput
  ): Promise<CreateEventIdentifierMutation> {
    const statement = `mutation CreateEventIdentifier($input: CreateEventIdentifierInput!, $condition: ModelEventIdentifierConditionInput) {
        createEventIdentifier(input: $input, condition: $condition) {
          __typename
          id
          eventId
          identifierId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateEventIdentifierMutation>response.data.createEventIdentifier;
  }
  async UpdateEventIdentifier(
    input: UpdateEventIdentifierInput,
    condition?: ModelEventIdentifierConditionInput
  ): Promise<UpdateEventIdentifierMutation> {
    const statement = `mutation UpdateEventIdentifier($input: UpdateEventIdentifierInput!, $condition: ModelEventIdentifierConditionInput) {
        updateEventIdentifier(input: $input, condition: $condition) {
          __typename
          id
          eventId
          identifierId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateEventIdentifierMutation>response.data.updateEventIdentifier;
  }
  async DeleteEventIdentifier(
    input: DeleteEventIdentifierInput,
    condition?: ModelEventIdentifierConditionInput
  ): Promise<DeleteEventIdentifierMutation> {
    const statement = `mutation DeleteEventIdentifier($input: DeleteEventIdentifierInput!, $condition: ModelEventIdentifierConditionInput) {
        deleteEventIdentifier(input: $input, condition: $condition) {
          __typename
          id
          eventId
          identifierId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteEventIdentifierMutation>response.data.deleteEventIdentifier;
  }
  async CreateAttendeeInterest(
    input: CreateAttendeeInterestInput,
    condition?: ModelAttendeeInterestConditionInput
  ): Promise<CreateAttendeeInterestMutation> {
    const statement = `mutation CreateAttendeeInterest($input: CreateAttendeeInterestInput!, $condition: ModelAttendeeInterestConditionInput) {
        createAttendeeInterest(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          interestId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAttendeeInterestMutation>response.data.createAttendeeInterest;
  }
  async UpdateAttendeeInterest(
    input: UpdateAttendeeInterestInput,
    condition?: ModelAttendeeInterestConditionInput
  ): Promise<UpdateAttendeeInterestMutation> {
    const statement = `mutation UpdateAttendeeInterest($input: UpdateAttendeeInterestInput!, $condition: ModelAttendeeInterestConditionInput) {
        updateAttendeeInterest(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          interestId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAttendeeInterestMutation>response.data.updateAttendeeInterest;
  }
  async DeleteAttendeeInterest(
    input: DeleteAttendeeInterestInput,
    condition?: ModelAttendeeInterestConditionInput
  ): Promise<DeleteAttendeeInterestMutation> {
    const statement = `mutation DeleteAttendeeInterest($input: DeleteAttendeeInterestInput!, $condition: ModelAttendeeInterestConditionInput) {
        deleteAttendeeInterest(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          interestId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteAttendeeInterestMutation>response.data.deleteAttendeeInterest;
  }
  async CreateAttendeeDesiredIdentifier(
    input: CreateAttendeeDesiredIdentifierInput,
    condition?: ModelAttendeeDesiredIdentifierConditionInput
  ): Promise<CreateAttendeeDesiredIdentifierMutation> {
    const statement = `mutation CreateAttendeeDesiredIdentifier($input: CreateAttendeeDesiredIdentifierInput!, $condition: ModelAttendeeDesiredIdentifierConditionInput) {
        createAttendeeDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAttendeeDesiredIdentifierMutation>response.data.createAttendeeDesiredIdentifier;
  }
  async UpdateAttendeeDesiredIdentifier(
    input: UpdateAttendeeDesiredIdentifierInput,
    condition?: ModelAttendeeDesiredIdentifierConditionInput
  ): Promise<UpdateAttendeeDesiredIdentifierMutation> {
    const statement = `mutation UpdateAttendeeDesiredIdentifier($input: UpdateAttendeeDesiredIdentifierInput!, $condition: ModelAttendeeDesiredIdentifierConditionInput) {
        updateAttendeeDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAttendeeDesiredIdentifierMutation>response.data.updateAttendeeDesiredIdentifier;
  }
  async DeleteAttendeeDesiredIdentifier(
    input: DeleteAttendeeDesiredIdentifierInput,
    condition?: ModelAttendeeDesiredIdentifierConditionInput
  ): Promise<DeleteAttendeeDesiredIdentifierMutation> {
    const statement = `mutation DeleteAttendeeDesiredIdentifier($input: DeleteAttendeeDesiredIdentifierInput!, $condition: ModelAttendeeDesiredIdentifierConditionInput) {
        deleteAttendeeDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteAttendeeDesiredIdentifierMutation>response.data.deleteAttendeeDesiredIdentifier;
  }
  async CreateAttendeeOwnIdentifier(
    input: CreateAttendeeOwnIdentifierInput,
    condition?: ModelAttendeeOwnIdentifierConditionInput
  ): Promise<CreateAttendeeOwnIdentifierMutation> {
    const statement = `mutation CreateAttendeeOwnIdentifier($input: CreateAttendeeOwnIdentifierInput!, $condition: ModelAttendeeOwnIdentifierConditionInput) {
        createAttendeeOwnIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAttendeeOwnIdentifierMutation>response.data.createAttendeeOwnIdentifier;
  }
  async UpdateAttendeeOwnIdentifier(
    input: UpdateAttendeeOwnIdentifierInput,
    condition?: ModelAttendeeOwnIdentifierConditionInput
  ): Promise<UpdateAttendeeOwnIdentifierMutation> {
    const statement = `mutation UpdateAttendeeOwnIdentifier($input: UpdateAttendeeOwnIdentifierInput!, $condition: ModelAttendeeOwnIdentifierConditionInput) {
        updateAttendeeOwnIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAttendeeOwnIdentifierMutation>response.data.updateAttendeeOwnIdentifier;
  }
  async DeleteAttendeeOwnIdentifier(
    input: DeleteAttendeeOwnIdentifierInput,
    condition?: ModelAttendeeOwnIdentifierConditionInput
  ): Promise<DeleteAttendeeOwnIdentifierMutation> {
    const statement = `mutation DeleteAttendeeOwnIdentifier($input: DeleteAttendeeOwnIdentifierInput!, $condition: ModelAttendeeOwnIdentifierConditionInput) {
        deleteAttendeeOwnIdentifier(input: $input, condition: $condition) {
          __typename
          id
          attendeeId
          identifierId
          eventId
          owner
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          identifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteAttendeeOwnIdentifierMutation>response.data.deleteAttendeeOwnIdentifier;
  }
  async CreateReport(
    input: CreateReportInput,
    condition?: ModelReportConditionInput
  ): Promise<CreateReportMutation> {
    const statement = `mutation CreateReport($input: CreateReportInput!, $condition: ModelReportConditionInput) {
        createReport(input: $input, condition: $condition) {
          __typename
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          id
          owner
          reportingAttendeeId
          reportingAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reportedAttendeeId
          reportedAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reason
          message
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateReportMutation>response.data.createReport;
  }
  async UpdateReport(
    input: UpdateReportInput,
    condition?: ModelReportConditionInput
  ): Promise<UpdateReportMutation> {
    const statement = `mutation UpdateReport($input: UpdateReportInput!, $condition: ModelReportConditionInput) {
        updateReport(input: $input, condition: $condition) {
          __typename
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          id
          owner
          reportingAttendeeId
          reportingAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reportedAttendeeId
          reportedAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reason
          message
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateReportMutation>response.data.updateReport;
  }
  async DeleteReport(
    input: DeleteReportInput,
    condition?: ModelReportConditionInput
  ): Promise<DeleteReportMutation> {
    const statement = `mutation DeleteReport($input: DeleteReportInput!, $condition: ModelReportConditionInput) {
        deleteReport(input: $input, condition: $condition) {
          __typename
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          id
          owner
          reportingAttendeeId
          reportingAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reportedAttendeeId
          reportedAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reason
          message
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteReportMutation>response.data.deleteReport;
  }
  async UpdateChatThread(
    input: UpdateChatThreadInput,
    condition?: ModelChatThreadConditionInput
  ): Promise<UpdateChatThreadMutation> {
    const statement = `mutation UpdateChatThread($input: UpdateChatThreadInput!, $condition: ModelChatThreadConditionInput) {
        updateChatThread(input: $input, condition: $condition) {
          __typename
          id
          eventId
          lastMessageAt
          attendee1LastReadAt
          attendee2LastReadAt
          messages {
            __typename
            nextToken
          }
          matchId
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateChatThreadMutation>response.data.updateChatThread;
  }
  async CreateMessage(
    input: CreateMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<CreateMessageMutation> {
    const statement = `mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
        createMessage(input: $input, condition: $condition) {
          __typename
          id
          content
          createdAt
          owner
          attendeeId
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          chatThreadId
          chatThread {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMessageMutation>response.data.createMessage;
  }
  async DeleteMatch(
    input: DeleteMatchInput,
    condition?: ModelMatchConditionInput
  ): Promise<DeleteMatchMutation> {
    const statement = `mutation DeleteMatch($input: DeleteMatchInput!, $condition: ModelMatchConditionInput) {
        deleteMatch(input: $input, condition: $condition) {
          __typename
          id
          owners
          attendee1Id
          attendee2Id
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          createdAt
          attendee1 {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          attendee2 {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMatchMutation>response.data.deleteMatch;
  }
  async CreateCandidateInterest(
    input: CreateCandidateInterestInput,
    condition?: ModelCandidateInterestConditionInput
  ): Promise<CreateCandidateInterestMutation> {
    const statement = `mutation CreateCandidateInterest($input: CreateCandidateInterestInput!, $condition: ModelCandidateInterestConditionInput) {
        createCandidateInterest(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          interestId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCandidateInterestMutation>response.data.createCandidateInterest;
  }
  async UpdateCandidateInterest(
    input: UpdateCandidateInterestInput,
    condition?: ModelCandidateInterestConditionInput
  ): Promise<UpdateCandidateInterestMutation> {
    const statement = `mutation UpdateCandidateInterest($input: UpdateCandidateInterestInput!, $condition: ModelCandidateInterestConditionInput) {
        updateCandidateInterest(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          interestId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCandidateInterestMutation>response.data.updateCandidateInterest;
  }
  async DeleteCandidateInterest(
    input: DeleteCandidateInterestInput,
    condition?: ModelCandidateInterestConditionInput
  ): Promise<DeleteCandidateInterestMutation> {
    const statement = `mutation DeleteCandidateInterest($input: DeleteCandidateInterestInput!, $condition: ModelCandidateInterestConditionInput) {
        deleteCandidateInterest(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          interestId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCandidateInterestMutation>response.data.deleteCandidateInterest;
  }
  async CreateCandidateDesiredIdentifier(
    input: CreateCandidateDesiredIdentifierInput,
    condition?: ModelCandidateDesiredIdentifierConditionInput
  ): Promise<CreateCandidateDesiredIdentifierMutation> {
    const statement = `mutation CreateCandidateDesiredIdentifier($input: CreateCandidateDesiredIdentifierInput!, $condition: ModelCandidateDesiredIdentifierConditionInput) {
        createCandidateDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          desiredIdentifierId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCandidateDesiredIdentifierMutation>response.data.createCandidateDesiredIdentifier;
  }
  async UpdateCandidateDesiredIdentifier(
    input: UpdateCandidateDesiredIdentifierInput,
    condition?: ModelCandidateDesiredIdentifierConditionInput
  ): Promise<UpdateCandidateDesiredIdentifierMutation> {
    const statement = `mutation UpdateCandidateDesiredIdentifier($input: UpdateCandidateDesiredIdentifierInput!, $condition: ModelCandidateDesiredIdentifierConditionInput) {
        updateCandidateDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          desiredIdentifierId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCandidateDesiredIdentifierMutation>response.data.updateCandidateDesiredIdentifier;
  }
  async DeleteCandidateDesiredIdentifier(
    input: DeleteCandidateDesiredIdentifierInput,
    condition?: ModelCandidateDesiredIdentifierConditionInput
  ): Promise<DeleteCandidateDesiredIdentifierMutation> {
    const statement = `mutation DeleteCandidateDesiredIdentifier($input: DeleteCandidateDesiredIdentifierInput!, $condition: ModelCandidateDesiredIdentifierConditionInput) {
        deleteCandidateDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          desiredIdentifierId
          eventId
          owner
          candidate {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCandidateDesiredIdentifierMutation>response.data.deleteCandidateDesiredIdentifier;
  }
  async CreateMatchInterest(
    input: CreateMatchInterestInput,
    condition?: ModelMatchInterestConditionInput
  ): Promise<CreateMatchInterestMutation> {
    const statement = `mutation CreateMatchInterest($input: CreateMatchInterestInput!, $condition: ModelMatchInterestConditionInput) {
        createMatchInterest(input: $input, condition: $condition) {
          __typename
          id
          matchId
          interestId
          eventId
          owner
          attendeeId
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMatchInterestMutation>response.data.createMatchInterest;
  }
  async UpdateMatchInterest(
    input: UpdateMatchInterestInput,
    condition?: ModelMatchInterestConditionInput
  ): Promise<UpdateMatchInterestMutation> {
    const statement = `mutation UpdateMatchInterest($input: UpdateMatchInterestInput!, $condition: ModelMatchInterestConditionInput) {
        updateMatchInterest(input: $input, condition: $condition) {
          __typename
          id
          matchId
          interestId
          eventId
          owner
          attendeeId
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMatchInterestMutation>response.data.updateMatchInterest;
  }
  async DeleteMatchInterest(
    input: DeleteMatchInterestInput,
    condition?: ModelMatchInterestConditionInput
  ): Promise<DeleteMatchInterestMutation> {
    const statement = `mutation DeleteMatchInterest($input: DeleteMatchInterestInput!, $condition: ModelMatchInterestConditionInput) {
        deleteMatchInterest(input: $input, condition: $condition) {
          __typename
          id
          matchId
          interestId
          eventId
          owner
          attendeeId
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          interest {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMatchInterestMutation>response.data.deleteMatchInterest;
  }
  async CreateMatchDesiredIdentifier(
    input: CreateMatchDesiredIdentifierInput,
    condition?: ModelMatchDesiredIdentifierConditionInput
  ): Promise<CreateMatchDesiredIdentifierMutation> {
    const statement = `mutation CreateMatchDesiredIdentifier($input: CreateMatchDesiredIdentifierInput!, $condition: ModelMatchDesiredIdentifierConditionInput) {
        createMatchDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          matchId
          attendeeId
          desiredIdentifierId
          eventId
          owner
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMatchDesiredIdentifierMutation>response.data.createMatchDesiredIdentifier;
  }
  async UpdateMatchDesiredIdentifier(
    input: UpdateMatchDesiredIdentifierInput,
    condition?: ModelMatchDesiredIdentifierConditionInput
  ): Promise<UpdateMatchDesiredIdentifierMutation> {
    const statement = `mutation UpdateMatchDesiredIdentifier($input: UpdateMatchDesiredIdentifierInput!, $condition: ModelMatchDesiredIdentifierConditionInput) {
        updateMatchDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          matchId
          attendeeId
          desiredIdentifierId
          eventId
          owner
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMatchDesiredIdentifierMutation>response.data.updateMatchDesiredIdentifier;
  }
  async DeleteMatchDesiredIdentifier(
    input: DeleteMatchDesiredIdentifierInput,
    condition?: ModelMatchDesiredIdentifierConditionInput
  ): Promise<DeleteMatchDesiredIdentifierMutation> {
    const statement = `mutation DeleteMatchDesiredIdentifier($input: DeleteMatchDesiredIdentifierInput!, $condition: ModelMatchDesiredIdentifierConditionInput) {
        deleteMatchDesiredIdentifier(input: $input, condition: $condition) {
          __typename
          id
          matchId
          attendeeId
          desiredIdentifierId
          eventId
          owner
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          desiredIdentifier {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input,
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMatchDesiredIdentifierMutation>response.data.deleteMatchDesiredIdentifier;
  }
  async NumberOfUnreadMessages(chatThreadId?: string): Promise<number | null> {
    const statement = `query NumberOfUnreadMessages($chatThreadId: ID) {
        numberOfUnreadMessages(chatThreadId: $chatThreadId)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (chatThreadId) {
      gqlAPIServiceArguments.chatThreadId = chatThreadId;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <number | null>response.data.numberOfUnreadMessages;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          owner
          notificationConfig {
            __typename
            matches
            messages
            subscribe
          }
          termsAccepted
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async GetInterest(id: string): Promise<GetInterestQuery> {
    const statement = `query GetInterest($id: ID!) {
        getInterest(id: $id) {
          __typename
          id
          group
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetInterestQuery>response.data.getInterest;
  }
  async ListInterests(
    filter?: ModelInterestFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListInterestsQuery> {
    const statement = `query ListInterests($filter: ModelInterestFilterInput, $limit: Int, $nextToken: String) {
        listInterests(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            group
            name
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListInterestsQuery>response.data.listInterests;
  }
  async GetIdentifier(id: string): Promise<GetIdentifierQuery> {
    const statement = `query GetIdentifier($id: ID!) {
        getIdentifier(id: $id) {
          __typename
          id
          name
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetIdentifierQuery>response.data.getIdentifier;
  }
  async ListIdentifiers(
    filter?: ModelIdentifierFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListIdentifiersQuery> {
    const statement = `query ListIdentifiers($filter: ModelIdentifierFilterInput, $limit: Int, $nextToken: String) {
        listIdentifiers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListIdentifiersQuery>response.data.listIdentifiers;
  }
  async GetTheme(id: string): Promise<GetThemeQuery> {
    const statement = `query GetTheme($id: ID!) {
        getTheme(id: $id) {
          __typename
          id
          name
          primary
          secondary
          tertiary
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetThemeQuery>response.data.getTheme;
  }
  async ListThemes(
    filter?: ModelThemeFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListThemesQuery> {
    const statement = `query ListThemes($filter: ModelThemeFilterInput, $limit: Int, $nextToken: String) {
        listThemes(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            primary
            secondary
            tertiary
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListThemesQuery>response.data.listThemes;
  }
  async GetOrganizationMember(
    organizationId: string,
    userId: string
  ): Promise<GetOrganizationMemberQuery> {
    const statement = `query GetOrganizationMember($organizationId: ID!, $userId: ID!) {
        getOrganizationMember(organizationId: $organizationId, userId: $userId) {
          __typename
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          userId
          role
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      organizationId,
      userId,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetOrganizationMemberQuery>response.data.getOrganizationMember;
  }
  async ListOrganizationMembers(
    organizationId?: string,
    userId?: ModelIDKeyConditionInput,
    filter?: ModelOrganizationMemberFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListOrganizationMembersQuery> {
    const statement = `query ListOrganizationMembers($organizationId: ID, $userId: ModelIDKeyConditionInput, $filter: ModelOrganizationMemberFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listOrganizationMembers(organizationId: $organizationId, userId: $userId, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            organizationId
            userId
            role
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (organizationId) {
      gqlAPIServiceArguments.organizationId = organizationId;
    }
    if (userId) {
      gqlAPIServiceArguments.userId = userId;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListOrganizationMembersQuery>response.data.listOrganizationMembers;
  }
  async GetOrganization(id: string): Promise<GetOrganizationQuery> {
    const statement = `query GetOrganization($id: ID!) {
        getOrganization(id: $id) {
          __typename
          id
          owners
          name
          website
          facebook
          twitter
          linkedin
          events {
            __typename
            nextToken
          }
          members {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetOrganizationQuery>response.data.getOrganization;
  }
  async ListOrganizations(
    id?: string,
    filter?: ModelOrganizationFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListOrganizationsQuery> {
    const statement = `query ListOrganizations($id: ID, $filter: ModelOrganizationFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listOrganizations(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListOrganizationsQuery>response.data.listOrganizations;
  }
  async GetEvent(id: string): Promise<GetEventQuery> {
    const statement = `query GetEvent($id: ID!) {
        getEvent(id: $id) {
          __typename
          id
          organizationId
          organization {
            __typename
            id
            owners
            name
            website
            facebook
            twitter
            linkedin
            createdAt
            updatedAt
          }
          owners
          readers
          name
          status
          size
          logoUrl
          qrImageUrl
          description
          theme {
            __typename
            id
            name
            primary
            secondary
            tertiary
            createdAt
            updatedAt
          }
          registrationCode
          letsChatWithUrl
          website
          facebook
          twitter
          dateRange {
            __typename
            startDate
            endDate
          }
          interests {
            __typename
            nextToken
          }
          identifiers {
            __typename
            nextToken
          }
          maxInterests
          maxIdentifiers
          totalAmountDue
          paymentStatus
          payments {
            __typename
            transactionId
            amount
            receivedAt
          }
          attendees {
            __typename
            nextToken
          }
          reports {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetEventQuery>response.data.getEvent;
  }
  async ListEvents(
    filter?: ModelEventFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListEventsQuery> {
    const statement = `query ListEvents($filter: ModelEventFilterInput, $limit: Int, $nextToken: String) {
        listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListEventsQuery>response.data.listEvents;
  }
  async GetAttendee(id: string): Promise<GetAttendeeQuery> {
    const statement = `query GetAttendee($id: ID!) {
        getAttendee(id: $id) {
          __typename
          id
          owner
          userId
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
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          ownIdentifiers {
            __typename
            nextToken
          }
          eventId
          attendeeMatches {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          attendeeChats {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAttendeeQuery>response.data.getAttendee;
  }
  async ListAttendees(
    filter?: ModelAttendeeFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListAttendeesQuery> {
    const statement = `query ListAttendees($filter: ModelAttendeeFilterInput, $limit: Int, $nextToken: String) {
        listAttendees(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListAttendeesQuery>response.data.listAttendees;
  }
  async GetReport(eventId: string, id: string): Promise<GetReportQuery> {
    const statement = `query GetReport($eventId: ID!, $id: ID!) {
        getReport(eventId: $eventId, id: $id) {
          __typename
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          id
          owner
          reportingAttendeeId
          reportingAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reportedAttendeeId
          reportedAttendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          reason
          message
          status
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      eventId,
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetReportQuery>response.data.getReport;
  }
  async ListReports(
    eventId?: string,
    id?: ModelIDKeyConditionInput,
    filter?: ModelReportFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListReportsQuery> {
    const statement = `query ListReports($eventId: ID, $id: ModelIDKeyConditionInput, $filter: ModelReportFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listReports(eventId: $eventId, id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            eventId
            id
            owner
            reportingAttendeeId
            reportedAttendeeId
            reason
            message
            status
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (eventId) {
      gqlAPIServiceArguments.eventId = eventId;
    }
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListReportsQuery>response.data.listReports;
  }
  async GetChatThread(id: string): Promise<GetChatThreadQuery> {
    const statement = `query GetChatThread($id: ID!) {
        getChatThread(id: $id) {
          __typename
          id
          eventId
          lastMessageAt
          attendee1LastReadAt
          attendee2LastReadAt
          messages {
            __typename
            nextToken
          }
          matchId
          match {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetChatThreadQuery>response.data.getChatThread;
  }
  async ListChatThreads(
    filter?: ModelChatThreadFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListChatThreadsQuery> {
    const statement = `query ListChatThreads($filter: ModelChatThreadFilterInput, $limit: Int, $nextToken: String) {
        listChatThreads(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListChatThreadsQuery>response.data.listChatThreads;
  }
  async GetCandidate(id: string): Promise<GetCandidateQuery> {
    const statement = `query GetCandidate($id: ID!) {
        getCandidate(id: $id) {
          __typename
          id
          owner
          ownerAttendeeId
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          attendeeId
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          candidateType
          matchScore
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCandidateQuery>response.data.getCandidate;
  }
  async ListCandidates(
    filter?: ModelCandidateFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCandidatesQuery> {
    const statement = `query ListCandidates($filter: ModelCandidateFilterInput, $limit: Int, $nextToken: String) {
        listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCandidatesQuery>response.data.listCandidates;
  }
  async GetMatch(id: string): Promise<GetMatchQuery> {
    const statement = `query GetMatch($id: ID!) {
        getMatch(id: $id) {
          __typename
          id
          owners
          attendee1Id
          attendee2Id
          eventId
          event {
            __typename
            id
            organizationId
            owners
            readers
            name
            status
            size
            logoUrl
            qrImageUrl
            description
            registrationCode
            letsChatWithUrl
            website
            facebook
            twitter
            maxInterests
            maxIdentifiers
            totalAmountDue
            paymentStatus
            createdAt
            updatedAt
          }
          createdAt
          attendee1 {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          attendee2 {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          interests {
            __typename
            nextToken
          }
          desiredIdentifiers {
            __typename
            nextToken
          }
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMatchQuery>response.data.getMatch;
  }
  async ListMatches(
    filter?: ModelMatchFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMatchesQuery> {
    const statement = `query ListMatches($filter: ModelMatchFilterInput, $limit: Int, $nextToken: String) {
        listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            owners
            attendee1Id
            attendee2Id
            eventId
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMatchesQuery>response.data.listMatches;
  }
  async GetUserByOwner(
    owner?: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetUserByOwnerQuery> {
    const statement = `query GetUserByOwner($owner: ID, $sortDirection: ModelSortDirection, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        getUserByOwner(owner: $owner, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            owner
            termsAccepted
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserByOwnerQuery>response.data.getUserByOwner;
  }
  async CandidatesByEventId(
    eventId?: string,
    matchScore?: ModelIntKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelCandidateFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<CandidatesByEventIdQuery> {
    const statement = `query CandidatesByEventId($eventId: ID, $matchScore: ModelIntKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelCandidateFilterInput, $limit: Int, $nextToken: String) {
        candidatesByEventId(eventId: $eventId, matchScore: $matchScore, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            owner
            ownerAttendeeId
            eventId
            attendeeId
            candidateType
            matchScore
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (eventId) {
      gqlAPIServiceArguments.eventId = eventId;
    }
    if (matchScore) {
      gqlAPIServiceArguments.matchScore = matchScore;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CandidatesByEventIdQuery>response.data.candidatesByEventId;
  }
  OnCreateMessageListener(
    chatThreadId?: string
  ): Observable<SubscriptionResponse<Pick<__SubscriptionContainer, 'onCreateMessage'>>> {
    const statement = `subscription OnCreateMessage($chatThreadId: ID) {
        onCreateMessage(chatThreadId: $chatThreadId) {
          __typename
          id
          content
          createdAt
          owner
          attendeeId
          attendee {
            __typename
            id
            owner
            userId
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
            eventId
            createdAt
            updatedAt
          }
          chatThreadId
          chatThread {
            __typename
            id
            eventId
            lastMessageAt
            attendee1LastReadAt
            attendee2LastReadAt
            matchId
            createdAt
            updatedAt
          }
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (chatThreadId) {
      gqlAPIServiceArguments.chatThreadId = chatThreadId;
    }
    return API.graphql(graphqlOperation(statement, gqlAPIServiceArguments)) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, 'onCreateMessage'>>
    >;
  }
}

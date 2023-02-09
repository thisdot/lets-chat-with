export interface GQLCollection<T> {
  items: Array<T>;
  nextToken: string;
}

export interface Message {
  id: string;
  content: string;
  attendeeId: string;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  letsChatWithUrl: string;
  logoUrl: string;
  qrImageUrl: string;
  matches: Match[];
  chats: ChatThread[];
  interests: Interest[];
  identifiers: Identifier[];
  maxInterests: number;
  maxIdentifiers: number;
}

export interface Interest {
  id: string;
  name: string;
  group: string;
}

export interface Identifier {
  id: string;
  name: string;
}

export interface Attendee {
  id: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  title?: string;
  company?: string;
  pronouns?: string;
  interests?: Interest[];
  desiredIdentifiers: Identifier[];
  ownIdentifiers: Identifier[];
  eventId: string;
  event?: Event;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

export interface ChatThread {
  id: string;
  messages: GQLCollection<Message>;
  lastMessageAt: string;
  attendee1LastReadAt: Date;
  attendee2LastReadAt: Date;
  match: Match;
  matchId: string;
}

export interface NotificationConfig {
  messages: boolean;
  matches: boolean;
  subscribe: boolean;
}

export interface User {
  id: string;
  owner: string;
  notificationConfig: NotificationConfig;
  termsAccepted: boolean;
}

export enum CandidateType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  UNDECIDED = 'UNDECIDED',
}
export interface Candidate {
  id: string;
  attendee: Attendee;
  candidateType: CandidateType;
}

export interface MatchAttendee {
  id: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  title: string;
  company: string;
}

export interface MatchInterest {
  id: string;
  attendeeId: string;
  interest: Interest;
}

export interface MatchDesiredIdentifier {
  id: string;
  attendeeId: string;
  desiredIdentifier: Identifier;
}

export interface Match {
  id: string;
  attendee: MatchAttendee;
  attendee1Id: string;
  attendee2Id: string;
  createdAt: string;
  interests: MatchInterest[];
  desiredIdentifiers: MatchDesiredIdentifier[];
}

export interface MatchDetails {
  id: string;
  attendee: Attendee;
}

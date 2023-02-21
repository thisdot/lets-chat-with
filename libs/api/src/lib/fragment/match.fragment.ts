import gql from 'graphql-tag';
import { IdentifierModel, InterestModel } from '../../index';

export const matchAttendeeFragment = gql`
  fragment MatchAttendee on Attendee {
    id
    fullName
    avatarUrl
    bio
    title
    company
  }
`;

export const matchInterestFragment = gql`
  fragment MatchInterest on MatchInterest {
    id
    attendeeId
    interest {
      name
    }
  }
`;

export const matchDesiredIdentifierFragment = gql`
  fragment MatchDesiredIdentifier on MatchDesiredIdentifier {
    id
    attendeeId
    desiredIdentifier {
      name
    }
  }
`;

export const matchFragment = gql`
  ${matchAttendeeFragment}
  ${matchInterestFragment}
  ${matchDesiredIdentifierFragment}

  fragment Match on Match {
    id
    attendee1 {
      ...MatchAttendee
    }
    attendee2 {
      ...MatchAttendee
    }
    interests {
      items {
        ...MatchInterest
      }
    }
    desiredIdentifiers {
      items {
        ...MatchDesiredIdentifier
      }
    }
    createdAt
  }
`;

export const matchAttendeeDetailsFragment = gql`
  fragment MatchAttendeeDetails on Attendee {
    id
    fullName
    bio
    pronouns
    avatarUrl
    title
    interests {
      items {
        interest {
          id
          name
        }
      }
    }
    desiredIdentifiers {
      items {
        identifier {
          id
          name
        }
      }
    }
    ownIdentifiers {
      items {
        identifier {
          id
          name
        }
      }
    }
    linkedin
    twitter
    facebook
    eventId
  }
`;

export const matchDetailsFragment = gql`
  ${matchAttendeeDetailsFragment}
  ${matchInterestFragment}
  ${matchDesiredIdentifierFragment}

  fragment MatchDetails on Match {
    id
    attendee1 {
      ...MatchAttendeeDetails
    }
    attendee2 {
      ...MatchAttendeeDetails
    }
    interests {
      items {
        ...MatchInterest
      }
    }
    desiredIdentifiers {
      items {
        ...MatchDesiredIdentifier
      }
    }
    createdAt
  }
`;

export interface MatchAttendeeFragment {
  id: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  title: string;
  company: string;
}

export interface MatchInterestFragment {
  id: string;
  attendeeId: string;
  interest: InterestModel;
}

export interface MatchDesiredIdentifierFragment {
  id: string;
  attendeeId: string;
  desiredIdentifier: IdentifierModel;
}

export interface MatchFragment {
  id: string;
  attendee1: MatchAttendeeFragment;
  attendee2: MatchAttendeeFragment;
  createdAt: string;
  interests?: { items: MatchInterestFragment[] };
  desiredIdentifiers?: { items: MatchDesiredIdentifierFragment[] };
}

export interface MatchAttendeeDetailsFragment {
  id: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  title: string;
  interests?: InterestModel[];
  desiredIdentifiers: IdentifierModel[];
  ownIdentifiers: IdentifierModel[];
  linkedin: string;
  twitter: string;
  facebook: string;
  eventId: string;
}

export interface MatchDetailsFragment {
  id: string;
  attendee1: MatchAttendeeDetailsFragment;
  attendee2: MatchAttendeeDetailsFragment;
  createdAt: string;
  interests?: InterestModel[];
  desiredIdentifiers?: IdentifierModel[];
}

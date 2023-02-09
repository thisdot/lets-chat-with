export default {
  __typename: 'User',
  notificationConfig: {
    matches: true,
    messages: true,
    subscribe: true,
  },
  owner: '<ownerId>',
  email: '<email>',
  termsAccepted: true,
} as const;

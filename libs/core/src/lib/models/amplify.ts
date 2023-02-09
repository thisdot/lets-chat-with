export interface AmplifyCognitoUser {
  id: string; // some weird id
  username: string; // uuid
  attributes: {
    email: string;
    email_verified: boolean;
  };
}

import { UserCredentials } from '../../models/user-credentials';

export const userCredentials: UserCredentials = {
  email: 'johndoe@lost.com',
  password: 'myPr3ci0u$',
};

export const verificationCode = '123456';

export const userConfirmedResult = {
  user: { email: userCredentials.email, username: 'John Doe' },
  userConfirmed: true,
  userSub: 'sdsad',
  codeDeliveryDetails: null,
};

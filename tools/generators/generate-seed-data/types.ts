export type Entry<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
} & T;

export type OwnedEntry<T = {}> = Entry<T & { owner: string }>;

export type CognitoUser = { id: string; email: string };

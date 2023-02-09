import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import Auth from '@aws-amplify/auth';
import { ApolloLink, Observable } from 'apollo-link';
import { Subject, Observable as RxjsObservable } from 'rxjs';

const whitelist = new Set().add('onCreateMessage').add('createMessage').add('updateChatThread');

export const createNotifyMiddleware = function (
  subject: Subject<{ subPerOperation: RxjsObservable<string>; context: any }>
) {
  return new ApolloLink((operation, forward) => {
    const ctx = operation.getContext();

    if (ctx && ctx.ignoreSpinner) {
      return forward(operation);
    }

    // The whitelist will protect us from showing the loading indicator for some operations
    // It is specially useful for subscriptions because subscription never close the communication channel, and therefore will cause an infinite loading indicator.
    // @ts-ignore
    if (whitelist.has(operation.query.definitions[0].name.value)) {
      return forward(operation);
    }

    return new Observable((observer) => {
      const subPerOperation = new Subject<string>();
      subject.next({ subPerOperation: subPerOperation.asObservable(), context: {} });
      const r = forward(operation);
      r.subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          subPerOperation.next('FINISH');
          observer.error(err);
        },
        complete() {
          subPerOperation.next('FINISH');
          observer.complete();
        },
      });
    });
  });
};

export const createAppSyncClient = (
  subject: Subject<{ subPerOperation: RxjsObservable<string>; context: any }>,
  graphQlEndpoint: string,
  awsRegion: string
): any => {
  const authLink = createAppSyncLink({
    url: graphQlEndpoint,
    region: awsRegion,
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    complexObjectsCredentials: () => null,
  });
  return new AWSAppSyncClient({} as any, {
    link: ApolloLink.from([createNotifyMiddleware(subject), authLink]),
  });
};

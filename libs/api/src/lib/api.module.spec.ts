import { TestBed, waitForAsync } from '@angular/core/testing';
import { ApiModule } from './api.module';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { createAppSyncClient, createNotifyMiddleware } from './graphql-client';
import { Observable, Subject } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { Injectable, NgModule } from '@angular/core';
import { AUTH_TYPE, createAppSyncLink } from 'aws-appsync';
import { ApolloLink } from 'apollo-link';
import { QueryManager } from 'apollo-client/core/QueryManager';

describe('ApiModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ApiModule).toBeDefined();
  });
});
const GET_DOG_QUERY = gql`
  query getDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;
const GET_CAT_QUERY = gql`
  query getCat($name: String) {
    cat(name: $name) {
      id
      name
      breed
    }
  }
`;

const subject = new Subject<{ subPerOperation: Observable<string>; context: any }>();
@Injectable()
class GetDogQuery extends Query<
  {
    dog: { id: string; name: string };
  },
  {
    filter: { name: string };
  }
> {
  document = GET_DOG_QUERY;
}

@Injectable()
class GetCatQuery extends Query<
  {
    dog: { id: string; name: string };
  },
  {
    filter: { name: string };
  }
> {
  document = GET_CAT_QUERY;
}

@NgModule({
  imports: [ApolloTestingModule],
  providers: [GetDogQuery, GetCatQuery],
})
class TestApiModule {
  constructor(apollo: Apollo) {
    const client = apollo.getClient();
    const originRequestHandler = client.link.request;
    const linkWithMiddleware = ApolloLink.from([
      createNotifyMiddleware(subject),
      new ApolloLink(originRequestHandler),
    ]);
    client.link.request = function (operation, forward) {
      return linkWithMiddleware.request(operation, forward);
    };
  }
}

describe('ApolloModule', () => {
  let controller: ApolloTestingController;
  let apollo: Apollo;
  let dogQuery: GetDogQuery;
  let catQuery: GetDogQuery;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestApiModule],
    }).compileComponents();
    controller = TestBed.inject(ApolloTestingController);
    apollo = TestBed.inject(Apollo);
    dogQuery = TestBed.inject(GetDogQuery);
    catQuery = TestBed.inject(GetCatQuery);
  }));

  afterEach(() => {
    controller.verify();
  });

  it('should emit value per gql operation', (done: DoneFn) => {
    const logs: string[] = [];
    subject.subscribe((value) => {
      value.subPerOperation.subscribe((status) => {
        logs.push(status);
      });
    });
    dogQuery
      .fetch({ filter: { name: 'Mr Apollo' } })
      .subscribe((result: ApolloQueryResult<any>) => {
        logs.push(result?.data?.dog.name);
      });
    catQuery
      .fetch({ filter: { name: 'Mrs Apollo' } })
      .subscribe((result: ApolloQueryResult<any>) => {
        logs.push(result?.data?.cat.name);
      });
    const opDog = controller.expectOne(GET_DOG_QUERY);
    const opCat = controller.expectOne(GET_CAT_QUERY);
    // Respond with mock data, causing Observable to resolve.
    opDog.flush({
      data: {
        dog: {
          id: 0,
          name: 'Mr Apollo',
          breed: 'foo',
        },
      },
    });
    opCat.flush({
      data: {
        cat: {
          id: 0,
          name: 'Mrs Apollo',
          breed: 'foo',
        },
      },
    });
    setTimeout(() => {
      expect(logs).toEqual(['FINISH', 'FINISH', 'Mr Apollo', 'Mrs Apollo']);
      done();
    });
  });
});

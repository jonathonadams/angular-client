import { TestBed, inject } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';

import { GraphQLService } from './graphql.service';
import { of } from 'rxjs';

describe('GraphQLService', () => {
  let graphQLService: GraphQLService;
  let apolloSpy: any;
  const spyClass = { query: jest.fn(), mutate: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphQLService, { provide: Apollo, useValue: spyClass }]
    });

    // Inject the Appolo service and test controller for each test
    graphQLService = TestBed.get(GraphQLService);
    apolloSpy = TestBed.get(Apollo);
  });

  it('should be created', () => {
    expect(graphQLService).toBeTruthy();
  });

  describe('query', () => {
    it('should return an Apollo Query Result', () => {
      const query = `
      {
        query {
          id
        }
      }`;
      const spy = (apolloSpy.query = jest.fn(() => of({ data: 'success' })));
      graphQLService.query(query).subscribe(result => {
        expect(result.data).toEqual('success');
        expect(apolloSpy.query).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toBeUndefined();
      });
    });

    it('should send query variables if they are passed', () => {
      const query = `
      {
        query {
          id
        }
      }`;

      const variable = { variable: 'test' };

      const spy = (apolloSpy.query = jest.fn(() => of({ data: 'query success' })));
      graphQLService.query(query, variable).subscribe(result => {
        expect(result.data).toEqual('query success');
        expect(apolloSpy.query).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toBeDefined();
      });
    });
  });

  describe('mutation', () => {
    it('should return an Apollo Fetch Result', () => {
      const query = `
      mutation LoginUser($username: String!, $password: String!){
        login(username: $username, password: $password){
          user {
            username
          }
          token
        }
      }
      `;
      const variable = { username: 'test', password: 'password' };

      const spy = (apolloSpy.mutate = jest.fn(() => of({ data: 'mutate success' })));
      graphQLService.mutation<any>(query, variable).subscribe(result => {
        expect(result.data as any).toEqual('mutate success');
        expect(apolloSpy.mutate).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toBeDefined();
        expect(spy.mock.calls[0][1]).toEqual(variable);
      });
    });
  });
});

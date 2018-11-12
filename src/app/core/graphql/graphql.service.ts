import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';

@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  query<T>(query: string, variables?: any): Observable<ApolloQueryResult<T>> {
    return this.apollo.query({
      query: gql`
        ${query}
      `,
      variables: variables
    });
  }

  mutation<T>(query: string, variables: any): Observable<FetchResult<T>> {
    return this.apollo.mutate({
      mutation: gql`
        ${query}
      `,
      variables: variables
    });
  }
}

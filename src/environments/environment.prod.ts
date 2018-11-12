const serverUrl = 'localhost';

console.log('inside android prod');

export const environment = {
  production: true,
  serverUrl: `${serverUrl}:3000`,
  apiBaseUrl: `${serverUrl}:3000/api`,
  graphQLUrl: `${serverUrl}:3000/graphql`
};

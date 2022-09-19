import { GraphQLClient } from 'graphql-request';
import { apiBaseUrl } from '../constants/env';
import { useTokenStore } from './useTokenStore';

const { accessToken } = useTokenStore.getState();

const graphQLClient = new GraphQLClient(`${apiBaseUrl}`, {
  headers: {
    authorization: accessToken!
  }
})

export { graphQLClient }

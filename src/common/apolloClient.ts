import { ApolloClient } from 'apollo-client';
import { HttpLink} from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('user.token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const errroLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = new HttpLink({ uri: 'http://localhost:3008/entry/graphql' });

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errroLink, link]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'none'
    },
    query: {
      errorPolicy: 'none'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});


export default apolloClient
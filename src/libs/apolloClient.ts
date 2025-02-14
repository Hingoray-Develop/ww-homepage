import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getTokens } from ".";
import { makeStore } from ".";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const state = makeStore.getState();
  const tokens = getTokens();
  return {
    headers: {
      ...headers,
      authorization: tokens?.accessToken ? `Bearer ${tokens.accessToken}` : "",
      "x-team-id": state.user.currentTeam?.id || undefined,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    watchQuery: { fetchPolicy: "network-only" },
  },
});

export default client;

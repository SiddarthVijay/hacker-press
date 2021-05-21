import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink
} from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYyMTU5NDY2MX0.rjYtr0VaOfDXe6icf-j3IH0YMKVYMxC0Pq11YnLIXdw';

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "Authorization": token
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
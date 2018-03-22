import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './styles/index.css';
import './styles/App.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_TOKEN } from './constants';

// 2
const httpLink = new HttpLink({
    uri: process.env.REACT_APP_HTTP_LINK
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    });
    return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WS_LINK,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    }
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLinkWithAuthToken
);

// 3
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

// 4
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();

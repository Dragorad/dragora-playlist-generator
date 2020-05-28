import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk"
import { setContext } from "apollo-link-context"

const APP_ID = "dragoraselectortest-sveyc"
const app = Stitch.hasAppClient(APP_ID)
    ? Stitch.getAppClient(APP_ID)
    : Stitch.initializeAppClient(APP_ID)

async function getAccessToken(credential) {
    if (!app.auth.user) {
        await app.auth.loginWithCredential(credential)
    } else {
        await app.auth.refreshAccessToken();
    }
    const { accessToken } = app.auth.activeUserAuthInfo
    return accessToken
}

const credential = new AnonymousCredential();
const authorizationHeaderLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken(credential);
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
        },
    };
});

const graphql_url = `https://stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url })

const client = new ApolloClient({
    link: authorizationHeaderLink.concat(httpLink),
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()


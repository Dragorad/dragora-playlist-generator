import React, { createContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { render } from "react-dom"
import { AppContextProvider } from './stateContext/indexContext'
import './index.css'
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as RealmWeb from "realm-web"
// import { setContext } from "apollo-link-context"
// import * as initialState from './stateContext/initialState'
// import {reducer} from './stateContext/reducers'


const APP_ID = "dragoraselectortest-sveyc"


export const app = new RealmWeb.App({
  id: APP_ID,
  // baseUrl: "https://realm.mongodb.com"
});

async function loginAnonymous() {
  // Create an anonymous credential
  const credentials = RealmWeb.Credentials.anonymous();
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    if (user.id === app.currentUser.id) return user
  } catch (err) {
    console.error("Failed to log in", err);
  }
}
loginAnonymous().then(user => {
  console.log("Successfully logged in!", user)
})


// Add an Authorization header with a valid user access token to all GraphQL requests
const authorizationHeaderLink = setContext(async (_, { headers }) => {
  if (app.currentUser) {
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData();
  } else {
    // If no user is logged in, log in an anonymous user
    await app.logIn(RealmWeb.Credentials.anonymous());
  }
  // Get a valid access token for the current user
  const { accessToken } = app.currentUser;
  console.log("currentUser", accessToken, app.currentUser);

  // Set the Authorization header, preserving any other headers
  return {
    headers: {
      ...headers,

      Authorization: `Bearer ${accessToken}`

    }
  };
});

// Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

// Construct a new Apollo client with the links we just defined
const client = new ApolloClient({
  link: authorizationHeaderLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const firstPlaylist = app.functions.generatePlaylist({ bpm: 169, delta: 20 })
  .then(playlist => {
    console.log(playlist)
    return playlist

  })

export const getNewPlayList = async (inputObj) => {
  const playlist = await app.functions.generatePlaylist(inputObj)
  return playlist
}

ReactDOM.render(

  <AppContextProvider >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContextProvider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()


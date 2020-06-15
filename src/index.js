import React, {createContext, useReducer} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-browser-sdk"
import { setContext } from "apollo-link-context"
// import * as initialState from './stateContext/initialState'
// import {reducer} from './stateContext/reducers'
import { AppContextProvider } from './stateContext/indexContext'
import * as RealmWeb from "realm-web"


const APP_ID = "dragoraselectortest-sveyc"

export const app = new RealmWeb.App({ id: APP_ID });

// Create an anonymous credential
const credentials = RealmWeb.Credentials.anonymous();

async function loginAnonymous() {
    // Create an anonymous credential
    const credentials = RealmWeb.Credentials.anonymous();
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
    //   user.id === app.currentUser.id
      return user
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }
  loginAnonymous().then(user => {
    console.log("Successfully logged in!", user)
  })


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

// export const AppContext = createContext(null)


// export const AppContextProvider = props => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <AppContext.Provider value={[state, dispatch]}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }
export const getNewPlayList = async () => {
    const playlist = await app.functions.generatePlaylist({ bpm: 169, delta: 20 })
    console.log(playlist)
    return playlist
}
export const firstPlaylist = getNewPlayList()

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


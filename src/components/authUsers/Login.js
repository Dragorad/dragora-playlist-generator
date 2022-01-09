import { dispatch } from 'react'
import * as RealmWeb from "realm-web"
import { app } from '../../index'
import * as types from '../../stateContext/types'
import { AppContext } from '../../stateContext/indexContext'

export const logOut = async () => {
    await app.logOut()
    dispatch({
        type: types.SET_USER_ID,
        payload: ''
    })
}

const credentials = (userName, password) => {
    (userName != null && password != null) ?
        RealmWeb.Credentials.loginUserNamePassword(userName, password)
        :
        RealmWeb.Credentials.anonymous()
}

console.log('credentials', credentials)



export const logIn = async (credentials) => {

    try {
        // Authenticate the user
        const user = await app.logIn(credentials)
        console.log('user', user)
        // `App.currentUser` updates to match the logged in user
        // assert(user.id === app.currentUser.id)
        // return user

        // const user = await app.logIn(credentials)

        dispatch({
            type: types.SET_USER_ID,
            payload: {
                userID: user.id,
            }
        })
        console.log("Successfully logged in!", user)
    }
    catch (err) {
        console.error("Failed to log in", err);
    }
}
export const signUp = async (userName, password) => {
    const credentials = RealmWeb.Credentials.loginUserNamePassword(userName, password)
    try {
        RealmWeb.registerUser(credentials)
        logIn(credentials)
    } catch (error) {
        console.log(error.message)
    }
}

// export const loginUserNamePassword = async (username, password) => {
//     const credentials = RealmWeb.Credentials.loginUserNamePassword(username, password)
//     try {
//         const user = await app.logIn(credentials)
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// }

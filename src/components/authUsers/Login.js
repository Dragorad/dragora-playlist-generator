import React, { useContext } from 'react'
import * as RealmWeb from "realm-web"
import { app } from '../../index'
import * as types from '../../stateContext/types'
import { AppContext } from '../../stateContext/indexContext'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: "#ff1166",
        margin: '1rem, 0',
        label: {
            color: "secondary",
            fontSize: '3rem'
        }
    }
}))

export const LogButton = () => {
    const classes = useStyles()
    const [appState, dispatch] = useContext(AppContext)
    function UserDetail() {
        return (
            <div>
                <h4>Logged in with anonymous id: {appState.userId}</h4>
            </div>
        );
    }
    const LoginButton = () => {
        return (<Button variant="outlined"
            className={classes.button}
            onClick={loginAnonymous}>
            Log In
        </Button>)
    }
    const LogOutButton = () => {
        return (<Button variant="text" color="default"
            onClick={logOut}>
            Log Out
        </Button>)
    }
    const logOut = async () => {
        await app.logOut()
        dispatch({
            type: types.SET_USER_DATA,
            payload: ''
        })
    }
    const loginAnonymous = async () => {

        const credentials = RealmWeb.Credentials.anonymous();

        const user = await app.logIn(credentials)

        dispatch({
            type: types.SET_USER_DATA,
            payload: {
                userID: user.id,
            }
        })
        console.log("Successfully logged in!", user)

    }
    return (
        <React.Fragment>
            {appState.userId === '' ?
                <LoginButton /> : <LogOutButton />}
        </React.Fragment>
    )
}
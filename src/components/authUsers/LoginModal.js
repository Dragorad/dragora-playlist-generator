import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Modal from '@material-ui/core/Modal';
import {
    Paper, Button, TextField, Typography, InputAdornment, IconButton,
    FormControl, Input, InputLabel, OutlinedInput, ButtonGroup
} from '@material-ui/core'
import { blueGrey, green, grey } from '@material-ui/core/colors'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import MailIcon from '@material-ui/icons/Mail'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import * as RealmWeb from 'realm-web'
import { app } from '../../index'
import * as types from '../../stateContext/types'
import { AppContext } from '../../stateContext/indexContext'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '90%',
    margin: '1rem'
}
function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 350,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ffffff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 4, 3),
        margin: theme.spacing(1)
    },
    button: {
        backgroundColor: "#ff1166",
        // padding: '1rem, 0',
        label: {
            color: "secondary",
            fontSize: '3rem'
        },
        textInput: {
            margin: '0 5%'
        },
        textField: {
            color: 'blue'
        }
    }
}))


// Let registered users log in

export default function LoginInfoBox() {
    const [appState, dispatch] = useContext(AppContext)
    const classes = useStyles()
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false)
    const [state, setState] = React.useState({
        userName: '',
        passWord: '',
        rePassWord: '',
        showPassword: false,
        signIn: true
    })
    const registerUser = async (email, password) => {
        console.log('pass and rePass matching')
        // TODO: Register a new user with the specified email and password
        try {
            const user = await app.auth.emailPassword.registerUser(email, password)
            console.log(user.id)
            logInEmailPass(email, password)
        }
        catch (err) { console.log(err.message) }

    }
    const logInEmailPass = async (email, password) => {
        console.log(email + ' : ' + password)
        // TODO: Log in with the specified email and password
        try {
            const credentials = RealmWeb.Credentials.emailPassword(email, password);
            const user = await app.logIn(credentials)
            dispatch({
                type: types.SET_USER_DATA,
                payload: {
                    userID: user.id,
                }
            })
            console.log("Successfully logged in!", user)
            handleModalClose()
        } catch (err) {
            console.error("Failed to log in", err);
        }
    };

    // Let logged in users log out
    const logOut = async () => {
        // TODO: Log the current user out
        await app.logOut()
        dispatch({
            type: types.SET_USER_DATA,
            payload: ''
        })
        // setUser(app.currentUser);
    };
    const loginAnonymous = async () => {

        try {
            const credentials = RealmWeb.Credentials.anonymous();

            const user = await app.logIn(credentials)

            dispatch({
                type: types.SET_USER_DATA,
                payload: {
                    userID: user.id,
                }
            })
            handleModalClose()
            console.log("Successfully logged in!", user)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    }
    const handleInputChange = name => event => {
        event.preventDefault()
        setState({ ...state, [name]: event.target.value })
    }
    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }
    const onBtnClick = bool => e => {
        e.preventDefault()
        setState({ ...state, signIn: bool })
        console.log(state.signIn)
    }
    return (
        <div>
            {appState.userId === '' ? <Button
                variant="outlined"
                size='small'
                color='inherit'
                backgroundColor={blueGrey[200]}
                fontSize='0.8rem'
                onClick={handleModalOpen}> Login/SignUp </Button> :
                <Button name='LogOut' onClick={logOut} variant='outlined' size='small'
                    style={{ backgroundColor: grey[400], marginBottom: '2%' }} >
                    Log Out</Button>}

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleModalClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <ButtonGroup variant='text' fullWidth >
                        <Button id='modalButton 0' onClick={onBtnClick(true)}>Log In</Button>
                        <Button id='modalButton 1' onClick={onBtnClick(false)}>Sign UP</Button>
                    </ButtonGroup>

                    <p id="simple-modal-description">
                        <form key={'loginForm'} style={formStyles}
                            onSubmit={() => {
                                console.log(state)
                                // handleUpdateGenres(valueStr)
                                // h4String = " field updated"
                                // setUrlString('')
                            }}>
                            {/* <Typography component={"h4"} align={"left"} gutterBottom={true}>{h4String}</Typography> */}

                            <TextField id='userName' type='email' label={'E-mail'} name={'userName'}
                                margin='normal'
                                value={state.userName} placeholder='user name'
                                onChange={handleInputChange('userName')}
                                variant={'outlined'}
                                // helperText={`user name`}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <MailIcon /> </InputAdornment>,
                                }}
                            />
                            <FormControl
                                //  className={classes.textField}
                                variant='outlined'>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="passWord"
                                    type={state.showPassword ? 'text' : 'password'}
                                    value={state.passWord}
                                    onChange={handleInputChange('passWord')}
                                    name='passWord'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            {!state.signIn ?
                                <React.Fragment>
                                    <TextField id='rePassWord' label={'Retype Password'} name={'rePassWord'}
                                        value={state.rePassWord} placeholder='Retype password'
                                        onChange={handleInputChange('rePassWord')}
                                        margin='normal'
                                        variant={'outlined'}
                                        type={state.showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}  >
                                                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }} />

                                    <Button name='signUp' onClick={() => {
                                        const { userName, passWord, rePassWord } = state
                                        {
                                            passWord !== rePassWord && alert(`Password and Retype don't match`)
                                        }
                                        registerUser(userName, passWord)
                                    }}
                                        variant='contained' style={{
                                            backgroundColor: blueGrey[900], color: 'white',
                                            marginBottom: '2%'
                                        }}>Sign Up</Button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <Button name='emailPass' onClick={() => logInEmailPass(state.userName, state.passWord)} variant='contained' style={{
                                        backgroundColor: blueGrey[900], color: 'white',
                                        marginBottom: '2%'
                                    }}>
                                        Log In with e-mail and password</Button>
                                    <Button name='annonymous' onClick={loginAnonymous} variant='contained'
                                        style={{ backgroundColor: blueGrey[200], marginBottom: '2%' }}>
                                        Log In Anonymous</Button>
                                    <Button name='withGoogle' onClick={() => {
                                        alert("Under Construction")
                                    }} variant='contained' style={{ backgroundColor: blueGrey[400], marginBottom: '2%' }} endIcon={<Typography> ?</Typography>}>
                                        Log In with Google</Button>
                                </React.Fragment>}

                        </form>

                    </p>

                </div>
            </Modal>
        </div>
    );
}



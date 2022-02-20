import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import './App.css'
import { ThemeProvider, StyledEngineProvider, createTheme, } from '@mui/material';
import { AppContext } from './stateContext/indexContext'
import { app } from './index'
import { SET_USER_ID } from './stateContext/types'


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mph: 360,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    typography: {
      fontSize: 12,
      h6: {
        fontSize: '0.8 rem'
      },
      body1: {
        fontSize: '1 rem'
      },
      body2: {
        fontSize: '0.7 rem'
      },
      button: {
        fontSize: '0.6 rem'
      }
    }
  }
})

function App() {
  const [appState, dispatch] = useContext(AppContext)
  // console.log(app.currentUser)
  const userId = app.currentUser ? app.currentUser.id : ''


  // console.log('appstateUser', app.currentUser.id)

  if (appState.userId === '' && app.currentUser) {
    dispatch({
      type: SET_USER_ID,
      payload: userId
    })
  }



  return (
    <BrowserRouter>
      <React.Fragment>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </StyledEngineProvider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App

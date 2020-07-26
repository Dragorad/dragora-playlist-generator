import React, { useReducer, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import Footer from './components/footer/Footer'
import Notifications from 'react-notify-toast'
import logo from './logo.svg'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import loginAnonymous from './components/authUsers/LoginModal.js'
import { AppContext } from './stateContext/indexContext.js'
import * as RealmWeb from 'realm-web'
import { app } from './index'
import * as types from './stateContext/types'

const theme = createMuiTheme({
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
  overrides: {
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
  // const [appState, dispatch] = useContext(AppContext)
  // loginAnonymous()
  // const [user, setUser] = React.useState(app.currentUser)
  return (

    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Routes />
          {/* <Notifications
          options={notifyOptions}
          /> */}
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App

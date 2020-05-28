import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import Navbar from './components/navbar/Navbar'
// import Routes from './Routes'
import Footer from './components/footer/Footer'
import PersistentDrawerLeft from './components/navbar/PersistDrawer'
import Notifications from 'react-notify-toast'
import logo from './logo.svg'
import './App.css'

import { typography, positions } from '@material-ui/system'
import { Box, Container, ThemeProvider, createMuiTheme } from '@material-ui/core'
// import { TitlesArtistQuery } from './graphql/TitlesArtistQuery'
// import AddTitleURL from './components/player/graphql/TitleUpdateMutation'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      mph:360,
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
  return (
    <BrowserRouter>
      <React.Fragment>
        <ThemeProvider
          theme={theme}
        >


          <PersistentDrawerLeft />
          {/* <Routes /> */}
          <Notifications
          // options={notifyOptions}
          />
        </ThemeProvider>
      </React.Fragment>
    </BrowserRouter>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App

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
import { Box } from '@material-ui/core'
import { TitlesArtistQuery } from './components/TitlesArtistQuery'


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        < Box>
          <TitlesArtistQuery />
          {/* <PersistentDrawerLeft /> */}
          {/* <Routes /> */}
          <Notifications
          // options={notifyOptions}
          />
        </Box>
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

import React, { Suspense, useContext } from 'react'
// import clsx from 'clsx'
// import { useTheme } from '@mui/material/styles'
// import Drawer from '@mui/material/Drawer'
// import CssBaseline from '@mui/material/CssBaseline'
// import MuiAppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import List from '@mui/material/List'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight'
// import ListItem from '@mui/material/ListItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
// // import InboxIcon from '@mui/icons-material/MoveToInbox'
// import ShareIcon from '@mui/icons-material/Share'
// import QueueMusicIcon from '@mui/icons-material/QueueMusic'
// import SettingsIcon from '@mui/icons-material/Settings'
// import PermIdentityIcon from '@mui/icons-material/PermIdentity'
// import InfoBox from '../navbar/InfoBox'
import SlidersForm from '../UserView/SlidersForm'
import Grid from '@mui/material/Grid'
// import { blue } from '@mui/material/colors'
// import { LogButton } from '../authUsers/Login'
// import LoginInfoBox from '../authUsers/LoginModal'
import Notifications from 'react-notify-toast'
import GenresButtonsGroup from '../UserView/GenresButtonsGroup'
// import TitlesList from '../player/TitlesList'
import PlayerDr from '../player/PlayerDr'
import { AppContext } from '../../stateContext/indexContext'

const drawerWidth = 240



export default function PersistentDrawerLeft() {
  // const classes = useStyles()


  return (
    <>
      <p>Toto</p>

      <main
      // className={clsx(classes.content, {
      //   [classes.contentShift]: open,
      // })}
      >
        <Notifications />
        {/* <div className={classes.drawerHeader} /> */}
      </main>

      <Grid container xs={12} spacing={1}
        lg={10} xl={9}
      // className={classes.root}
      >
        {/* <Container > */}
        <Grid item sx={12} sm={3} md={2} lg={2}// genres buttons
          // style={{ border: '1px solid red' }}
          direction='row'>
          <GenresButtonsGroup />
        </Grid>
        <Grid container item xs={12} sm={5} direction='row' //sliders form
        // style={{border: '1px solid blue'}}
        >
          <Grid item >
            {/* <Paper elevation={2} > */}
            <SlidersForm />
            {/* </Paper> */}
          </Grid>

          <Grid item xs={12} direction='column' //PlayerDr
          >
            {/* <Paper elevation={1} > */}
            <PlayerDr />
            {/* </Paper> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} lg={3} //titlesList
        >
          {/* <TitlesList /> */}
        </Grid>
        {/* </Container> */}
      </Grid>
    </>

  )
}

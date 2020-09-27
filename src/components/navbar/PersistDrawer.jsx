import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import InboxIcon from '@material-ui/icons/MoveToInbox'
import ShareIcon from '@material-ui/icons/Share'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import SettingsIcon from '@material-ui/icons/Settings'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
// import GenresList from '../GenresContainer/GenresContainer'
import PlayerCard from '../player/PlayerCard'
import InfoBox from '../navbar/InfoBox'
import SlidersForm from '../UserView/SlidersForm'
import { Paper, Grid, Box } from '@material-ui/core'
// import PlayerDr from '../player/Player'
import ReactPlayer from 'react-player'
import { demoUrls } from '../player/demoUrls'
import { blueGrey, lightBlue, blue } from '@material-ui/core/colors'
import { LogButton } from '../authUsers/Login'
import LoginInfoBox from '../authUsers/LoginModal'
import Notifications from 'react-notify-toast'

const drawerWidth = 240


// const theme = createMuiTheme()

// theme.typography.h6 = {
//   fontSize: '1.1 rem',
//   '@media(max-width: 360px)': {
//     fontSize: '0.6 rem'
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '1.8 rem'
//   }
// }

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  appBar: {
    display: 'flex',
    backgroundColor: blue[900],

    fontSize: "1rem",
    justifyContent: 'space-between',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '1200px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Grid spacing={1} lg={10} xl={6}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar variant='dence'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap flexShrink='2' >
              DrAgora Music Selector Beta  !
          </Typography>
            <div style={{
              display: 'flex',
              position: 'relative', right: '1%',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: '20%'
            }}>
              {/* <LogButton /> */}
              <LoginInfoBox />
              <InfoBox />
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Following', 'Playlists', 'Starred', 'Share'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <QueueMusicIcon /> : <ShareIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Login', 'Preferences'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <PermIdentityIcon /> : <SettingsIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Notifications />
        <div className={classes.drawerHeader} />
      </main>
      {/* <content> */}
      {/* <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'flex-start',
          justify: 'space-between'
        }}> */}

      {/* <Paper elevation={4}> */}
      {/* <div style={{width: '60%'}}> */}
      <Grid container xs={12} spacing={1}
        lg={10} xl={9}
      >
        <Grid item xs={12}
        >
          <SlidersForm />
        </Grid>
        <Grid item xs={12} lg={10} xl={9}>
          <PlayerCard />
        </Grid>
      </Grid>
      {/* </div> */}
      {/* </content> */}
    </React.Fragment>

  )
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'
// import { positions } from '@material-ui/system'

const useStyles = makeStyles({
  root: {
    width: 500,
  },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
      position='relative'
      bottom={0}
      right={0}
    >
      <div>Dragora Music Selector <span>DrAgora Soft &reg </span></div>
      <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}

// export default function Footer (props) {

//   return (
      
//       <footer>Dragora Music Selector <span>DrAgora Soft &reg </span></footer>
//       )
// }

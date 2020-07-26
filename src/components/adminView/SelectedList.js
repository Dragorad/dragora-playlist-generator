import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'


// props arr for items , title for the listTitle

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 220,
        backgroundColor: theme.palette.background.paper,
    },
}))

export  function ItemsList(props) {
    const classes = useStyles()
    const [selectedIndex, setSelectedIndex] = React.useState(1)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label={props.title}>
                {props.arr.map((elem, index) => (
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        {/* <ListItemIcon>
                            <InboxIco />
                        </ListItemIcon> */}
                        <ListItemText primary={elem} />
                    </ListItem>
                ))}
            </List>
            <Divider />

        </div>
    )
}

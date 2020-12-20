import { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
// import IconButton from '@material-ui/core/IconButton'
// import CloseIcon from '@material-ui/icons/Close'
import { AppContext } from '../../stateContext/indexContext'
import { SET_ALERT_OPEN } from '../../stateContext/types'
// import { Button } from '@material-ui/core'



export default function SnackBar() {
    const [dispatch] = useContext(AppContext)
const alertOpen = false

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({
            type: SET_ALERT_OPEN,
            payload: false
        })
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
            // action={
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={handleClose}>
            //             UNDO  </Button>

            //         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // }
            > You have to choose at least one genre </Snackbar>
        </div>
    )
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import GenreButton from '../GenresContainer/GenreButton'
import Modal from '@material-ui/core/Modal';
import { Paper, Button } from '@material-ui/core'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

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
    button:{
        backgroundColor: "#ff1166",
        label:{
            color: "secondary",
            fontSize: '3rem'
        }
    }
}));

export default function InfoBox() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
           {/* <div> */}
             <Button
              variant="outlined"
            size='small'
            color='inherit'
            backgroundColor='#ff1133'
            fontSize='0.8rem'
            onClick={handleOpen}>
               App Info
                </Button>
                {/* </div> */}
                      <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">How to use</h2>
                    <p id="simple-modal-description">
                    <Typography>
//          Всяка една от композициите е избрана лично от опитен музикален редактор с доказано добър вкус.<br/>
//          Изберете жанр, средно темпо и средна гръмкост и ще получите първите пет предложения.<br/>
//          С Diversity управлявате колко често да се сменят стила и темпата на траковете вътре в плейлистата.<br/>
//          Можете да харесвате и нехаресвате конкретен трак. <br/>
//          Регистрираните потребители могат да следват хората, които предлагат траковете и да запазват плейлисти.
     </Typography>
          </p>

                </div>
            </Modal>
        </div>
    );
}



// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '60%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }))

// export default function InfoBox() {
//   const classes = useStyles()

//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography className={classes.heading}>Expansion Panel 1</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//           <Typography paragraph>

//          <Typography paragraph>
//          Това е приложение за генериране на плейлисти в които няма да имате усещането, че слушате едно и също парче по много пъти!<br/>
//          </Typography>
//          Всяка една от композициите е избрана лично от висококласен музикален редактор с доказано добър вкус.<br/>
//          Изберете жанр, средно темпо и средна гръмкост и ще получите първите пет предложения.<br/>
//          С Diversity управлявате колко често да се сменят стила и темпата на траковете вътре в плейлистата.<br/>
//          Можете да харесвате и нехаресвате конкретен трак. <br/>
//          Регистрираните потребители могат да следват хората, които предлагат траковете и да запазват плейлисти<div className=""></div><div className=""></div>
//          <div className=""></div>
//        </Typography>
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography className={classes.heading}>Expansion Panel 2</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
//             sit amet blandit leo lobortis eget.
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//       <ExpansionPanel disabled>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
//         </ExpansionPanelSummary>
//       </ExpansionPanel>
//     </div>
//   )
// }

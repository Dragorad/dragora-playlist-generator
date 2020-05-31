import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
        maxWidth: "75%",
        maxHeight: '30%'

    },
    margin: {
        height: theme.spacing(  ),
    },
}))

function ValueLabelComponent(props) {
    const { children, open, value } = props

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    )
}


function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </span>
    )
}

export default function SliderMUI(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography gutterBottom>{props.sliderText}</Typography>
            <Slider
                ValueLabelComponent={ValueLabelComponent}
                aria-label="custom thumb label"
                defaultValue={20} />
        </div>
    )
}

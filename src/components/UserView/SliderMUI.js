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
        height: theme.spacing(),
    },
}))

function ValueLabelComponent(props) {
    const { children, open, value: val } = props

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={val}>
            {children}
        </Tooltip>
    )
}


export default function SliderMUI(props) {
    const classes = useStyles()
    // const [value, setValue] = React.useState({ [props.sliderText]: 0 })
    // const handleChange = (ev, newValue) => {
    //     setValue(newValue)
    // }
    // const handleCommit = (ev, value) => {
    //     alert(`${props.sliderText} : ${value}`)
    // }
    return (
        <div className={classes.root}>
            <Typography gutterBottom>{props.sliderText}</Typography>
            <Slider
                ValueLabelComponent={ValueLabelComponent}
                aria-label={props.sliderText}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={props.onChange}
                onChangeCommitted={props.onChangeCommitted}
                step={10}
            />
        </div>
    )
}

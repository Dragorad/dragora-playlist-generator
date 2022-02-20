import React from 'react'
// import PropTypes from 'prop-types'
import makeStyles from '@mui/styles/makeStyles';
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
        // width: 300 + theme.spacing(3) * 2,
        width: "90%",
        // height: '10%'

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
            <Typography gutterBottom
                style={{ height: '30%' }}>{props.sliderText}</Typography>
            <Slider
                ValueLabelComponent={ValueLabelComponent}
                min={5}
                aria-label={props.sliderText}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                onChangeCommitted={props.onChangeCommitted}
                step={10}
            />
        </div>
    )
}

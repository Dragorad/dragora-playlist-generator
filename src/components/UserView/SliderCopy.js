import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

// const handleCommit = name => (ev, value) => {
//   alert(`${name} ${value}`)
//   setState({ ...state, [name]: value })
// }



// const handleSliderChange = name => (ev, value) => {
//   ev.preventDefault()
//   setState({
//       ...state, [name]: value
//   })
// }

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Mamata
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
    {/* <Typography id="discrete-slider" gutterBottom>
                            Temperature
                        </Typography>
                        <Slider
                            defaultValue={state.stName}
                            value={state[stName]}
                            // getAriaValueText={valuetext}
                            // aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            name={stName}
                            onChange={onSliderChange(stName)}
                            onChangeCommitted={handleCommit(stName)}
                            step={10}
                            marks
                            min={10}
                            max={110}
                        /> */}

      </Grid>
    </div>
  );
}

import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { Container, Button } from '@material-ui/core'
import { demoUrls, GET_FIVE, getRandomInt } from './demoUrls'
import PlayerDr from './Player'
import TitlesList from './TitlesList'
import { generatePlaylist } from '../../graphql/Realms'
import randomUrls from '../UserView/SlidersForm'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    height: "15%"
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}))


const getRandomBpm = getRandomInt(85, 185)
// const randomUrls = generatePlaylist(inputObj)
console.log(randomUrls)
const initialState = {
  playing: true,
  urlIndex: 0
}

export default function PlayerCard() {
  const classes = useStyles()
  const theme = useTheme()
  // const urlIndex = 0
  const [state, setState] = useState(initialState)
  const changeUrlIndex = direction => (event) => {
    // alert(` you set direction ${direction}`)

    switch (direction) {
      case 'up':
        return state.urlIndex < randomUrls.length - 1 ?
          setState({ ...state, urlIndex: state.urlIndex + 1 })
          : setState({ ...state, urlIndex: 0 })
      case 'down':
        return state.urlIndex > 0 ?
          setState({ ...state, urlIndex: state.urlIndex - 1 })
          : setState({ ...state, urlIndex: randomUrls.length - 1 })
      default: return setState({ ...state, urlIndex: direction })

    }
  }
  const { loading, error, data } = useQuery(GET_FIVE, {
    variables: { randomBpm: 140 },
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(
  {error.message} </p>


  const randomUrls = data.title_records.map(elem => `https://youtu.be/${elem.url}`)
  console.log(data.title_records)

  return (
    <Container className={classes.root}>
      <PlayerDr
        url={randomUrls[state.urlIndex]}
        playing={state.playing}
        light={true}
        // playIcon={'none'}
        controls='false'
        width={'100%'}
        height={'15%'}
        onEnded={changeUrlIndex('up')} />

      <div className={classes.details}>
        {/* <CardContent className={classes.content}>
        <Typography variant="subtitle1" color="textSecondary">
        Media Player
        </Typography>
        <Typography component="h6" variant="subtitle1">
        Title Name
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          Artist Name
          </Typography>
          {/* </CardContent> */}
        <div className={classes.controls}>
          <IconButton aria-label="previous"
            onClick={changeUrlIndex('down')}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next"
            onClick={changeUrlIndex('up')}
          >
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
        <CardContent className={classes.content}>

          {/* <CardMedia
        className={classes.cover}
      // image="/static/images/cards/live-from-space.jpg"
      // title="Live from space album cover"
      > */}
          <TitlesList urlIndex={state.urlIndex} dataArr={data.title_records}
            setIndex={changeUrlIndex} />
          {/* <ReactPlayer /> */}

          {/* </CardMedia> */}
          <Typography variant="subtitle1" color="textSecondary">

          </Typography>
        </CardContent>
      </div>
    </Container>
  )
}

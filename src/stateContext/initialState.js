import { genresList } from '../workers/genresAndInstrumentsList'
import { descriptorsList } from '../workers/descriptorsList'
import { app } from '../index'
import { firstPlaylist } from '../index'
import * as playLists from './preDefinedPlaylists'

// const initalPlaylist = firstPlaylist

const genresFilterList = genresList.join(' ').split(' ')
  .filter(elem => elem !== "and")


export const getNewPlayList = async () => {
  const playlist = await app.functions.generatePlaylist({ bpm: 169, delta: 20 })
  console.log(playlist)
  return playlist
}

export const initialState = {
  playListParams: {
    Brightness: 25,
    Loudness: 45,
    Tempo: 14,
    Diversity: 20,
    diversityStrings: [],
    bpm: 120
  },
  btnState: {
    genresArr: ['genres'],
    descriptorsArr: ['descr']

  },
  sliderFormValues: {
    genresList: genresFilterList,
    Brightness: 35,
    Loudness: 60,
    Tempo: 40
  },
  diversity: {
    value: 20,
    params: []
  },
  urlIdx: 0,
  playing: true,
  playlist: []
}

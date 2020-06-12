import { genresList } from '../../src/workers/genresAndInstrumentsList'
import { descriptorsList } from '../../src/workers/descriptorsList'

const genresFilterList = genresList.join(' ').split(' ')
    .filter(elem => elem !== "and")

export const state = {
    sliderFormValues: {
        genresList: genresFilterList,
        sliderValues: {
            brightness: 35,
            loudness: 60,
            tempo: 60
        },
        diversity: {
            value: 20,
            params: []
        }
    },
    playListParams: {
        diversity: 20,
        bpm: 120
    },
    playlist: []
}
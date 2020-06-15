import { getRandomInt } from '../../src/components/player/demoUrls'
import { initialState } from '../stateContext/initialState'
import { genresList } from '../workers/genresAndInstrumentsList'
import * as operators from './operators'


export const setDiversity = ({ state }, value) => {
    state.diversify = value
    // console.log(context.state)
}
export const setRandomBpm = ({ state }, value) => {
    state.playListParams.bpm = value
    alert(`random BPM is ${state.playListParams.bpm}`)
}
export const formButtonAction = ({ state }, value) => {
    const { genresArr, descriptorsArr } = state.btnState
    const targetProp = genresList.includes(value) ? 'genresArr' : 'descriptorsArr'
    const targetArr = state.btnState[targetProp]

    // const targetArr = genresList.includes(value) ? state.btnState.genresArr : state.btnState.descriptorsArr
    let mutedArr = targetArr.filter(el => (el !== value))
    // console.log(mutedArr)
    !targetArr.includes(value) && mutedArr.push(value)

    const inputObj = {
        targetProp,
        mutedArr
    }
    // console.log(inputObj)

    operators.setArrValue(inputObj)

    // console.log(state.btnState)

}
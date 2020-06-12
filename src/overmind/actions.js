import {getRandomInt} from '../../src/components/player/demoUrls'
import { state} from './initialState'
 
export const setDiversity = ({ state }, value) => {
    state.diversify = value
}
export const setRandomBpm = ({state}, value ) =>{
    state.playListParams.bpm =value
}
// overmind/index.js
import {
    createHook, createStateHook,
    createActionsHook, createConnect, createEffectsHook, createReactionHook
} from 'overmind-react'
import { state } from './initialState'
import * as actions from './actions'


export const config = {
    state,
    actions
}

export const useOvermind = createHook()
export const useState = createStateHook()
export const useActions = createActionsHook()
// export const useEffects = createEffectsHook()
// export const useReaction = createReactionHook()


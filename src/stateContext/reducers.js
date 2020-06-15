import * as types from './types'

export const reducer = (state, action) => {
    switch (action.type) {
        // case types.ADD_CONTACT:
        //     return {
        //         contacts: [...state.contacts, action.payload]
        //     }
        // case types.DEL_CONTACT:
        //     return {
        //         contacts: state.contacts.filter(
        //             contact => contact.id !== action.payload
        //         )
        //     }
        case types.SET_SLIDER_VALUE: {
            const { name, value } = action.payload
            return {
                sliderFormValues: { ...state.sliderFormValues, [name]: value }
            }
        }
        case types.SET_NEW_PLAYLIST: {
            return {
                playList: { ...state.playlist, playList: action.payload }
            }
        }
        // case types.SET_BTN_STATE:
        //     return {

        //     }


        case "START":
            return {
                loading: true
            };
        case "COMPLETE":
            return {
                loading: false
            };
        default:
            throw new Error();
    }
}
import  UserActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null //=> this is for storing error message of Sagas Processes
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case UserActionTypes.SET_CURRENT_USER:
        //     return{
        //         ...state,
        //         currentUser: action.payload
        //     }

            // can also be like below. But unreadable
            // return Object.assign({}, state, {
            //     currentUser: action.payload
            // })

        /**
         * Impelementing Redux Saga for Google Sign In
         */
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null, //=> clear errors if no errors/success
            }

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }

        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }



        default:      // it's important that we have default here because
                      // ALL REDUCERS are getting fired at once when an action is triggered
                      // even if that action is actually not related to this reducer
                      // so if this userReducer is called then we just returned the state
            return state
    }
}

export default userReducer
// import SHOP_DATA from './shop.data'

import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
    collections: null,
    // isFetching will represent the "isLoading" that
    // we did on the shop.component page
    isFetching: false,

    // this is for the Error message, when FETCH_COLLECTIONS_FAILURE
    // is triggered
    errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
    // and again because as of now we dont have any modifications
    // so we will be just returning the default state
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        // "UDPATE COLLECTIONS" is for the "synchronous way"
        // case ShopActionTypes.UPDATE_COLLECTIONS:
        //     return {
        //         ...state,
        //         collections: action.payload
        //     }
        default:
            return state
    }
}

export default shopReducer



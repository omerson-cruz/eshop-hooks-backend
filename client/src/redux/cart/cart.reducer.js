import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils'
// import { removeItem } from './cart.actions'


const INITIAL_STATE = {
    hidden: true ,    // initially we wanna hide the dropdown when they come to our website

    cartItems: [],    // this wil hoold the array of cart Items
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                // below is the algorithm for removing an item by using the filter method
                // it simply means that when an ITem's ID is NOT equal to the ID of the item
                // that we want to remove then let's return TRUE. Since it is true it will be
                // included on the filtered ARRAY.
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            }

        // Emptying the Cart
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer
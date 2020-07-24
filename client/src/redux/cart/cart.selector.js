import { createSelector} from 'reselect'

// example of an "input" selector
// for input selector we take the argv1 as the WHOLE state and
// then returns a slice of state (1 deeper usually)
// so in this case we just wanted the "Cart"
const selectCart = state => {
    return state.cart
}

// Next thing we are gonna build is where we use the "createSelector"
// so that name "selectCartItems" is actually a property of the
//    "state.cart"
/**
 * [@03:44 22. Reselect Library]
 * createSelector
 * argv1 - a collection/array of input selectors
 * argv2 - a function that will RETURN the VALUE that we want out
 *          from the INPUT selector (e.g. selectCart)
 *       -  cb.argv1  - The parameters of this argv2 function is
 *              actually the "OUTPUT" of the input Selectors inside
 *              the Array of argv1. Take note the ORDER of Output
 *              selector parameter should be same as INPUT in the
 *              array
 *
 */

// Because we use the {createSelector} now it becomes a memoir selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems            // returns "cartItems" from cart object
)


export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)



/**
 * Now let's create another selector for our "itemCount" which we
 * will use in our "cart icon"
 */
// Notice that we are getting the INPUT selector for
// "selectCartItemsCount" from the "selectCartItems"
// So we are actually drilling down to more specific case
 export const selectCartItemsCount = createSelector(
     [selectCartItems],

     (cartItems) => cartItems.reduce(
         (accumulatedQuantity, cartItem) => {
        return accumulatedQuantity + cartItem.quantity
    }, 0) // initialValue of accumulator
 )


 // this selector will add All of the items in our Cart
 // So here we are compouting "theTOtal" Cost of all ITems in the Cart
 export const selectCartTotal = createSelector(
     [selectCartItems],

     (cartItems) => cartItems.reduce(
        (accumulatedQuantity, cartItem) => {
       return accumulatedQuantity + (cartItem.quantity * cartItem.price)
   }, 0) // initialValue of accumulator
 )
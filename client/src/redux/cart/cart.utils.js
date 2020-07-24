export const addItemToCart = (cartItems, cartItemToAdd) => {

    // so here we are checking if that cartItemToAdd already exist
    // if cartItemToAdd not found then will be undefined
    const existingCartItem =
        cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    // if existingCartItem then let's increase the quantity of that Item.id
    if (existingCartItem) {
        // remember we need to return NEW version of our cartItem Array in order to
        // make the Reactivity works
        return cartItems.map(cartItem =>
                cartItem.id === cartItemToAdd.id ?
                {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                }
                : cartItem
            )
    }

    // if the cartItem.id is not yet existing. (existingCartItem === undefined)
    // Then let's return a new Array that contains
    //  the new "cartItemToAdd" plus its base quantity = 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}


export const removeItemFromCart = (cartItems, cartItemToRemove) => {

    // so first we need to check if that Item we wanna remove is existing
    // in our current Cart
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    // quantity equal to 1 is special because if remaining quantity is already "1"
    // then our next step is to actually remove the ITem from the cart
    // because of course we dont want item with negative or zero value in it
    if (existingCartItem.quantity === 1) {
        // Again the algorithm to create a new array without the one that we wanted to remove
        // OR in other words this is the Algorithm of removing item from an array of OBjects
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
        // so here we say that we ONLY KEEP THE ITEM that is NOT EQUAL to the "cartItem To be REmoved"
    }

    // alternatively if the quantity is not Equal to one
    return cartItems.map(
        cartItem =>
            cartItem.id === cartItemToRemove.id    // if this is the cart Item we want to decrease by 1
            ?  {...cartItem, quantity: --cartItem.quantity}
            :  cartItem

    )
}
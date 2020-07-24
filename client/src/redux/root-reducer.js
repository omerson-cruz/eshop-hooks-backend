import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

// So with "storage" what we're going to get is the
// Actual "localStorage" object of our windows browser
//  it's like we wanna use the "storage" as my default storage
import storage from 'redux-persist/lib/storage'

// alternatively you can use the "sessionStorage" But here
// in our project we are going to use the "localStorage"
// import sessionStorage from 'redux-persist/lib/storage'


import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

// persistConfig is a JSON object for the configuration
// of what level of persistence we want for the "reducer"
const persistConfig = {
    // key: 'root' tells redux-persist at what point inside
    // of our reducer object do we want to start storing
    // everything in th persistent storage. Here we wanna start
    // from the root level
    key: 'root',

    // storage will say the storage key goes to whatever
    // the storage object from redux persist we're trying to use this
    storage,

    // whitelist is an array containing the "string name" of the reducer
    // that we want to store
    // since our user persistence is being handled by the "firebase backend"
    // in this project we are just going to use the cartReducer
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

// this will return back a modified version of "rootReducer" with
// persistent capabilities
export default persistReducer(persistConfig, rootReducer)

















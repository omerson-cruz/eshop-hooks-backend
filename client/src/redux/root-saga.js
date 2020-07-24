import { all, call } from 'redux-saga/effects'

// import { fetchCollectionsStart } from './shop/shop.sagas'
import { shopSagas } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'

// this will be the one BIG rootSaga for all of the application
export default function* rootSaga() {
    yield all([
        // call(fetchCollectionsStart),
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ])
}
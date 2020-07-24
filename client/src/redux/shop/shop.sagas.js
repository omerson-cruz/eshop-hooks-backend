import { takeLatest, call, put, all } from 'redux-saga/effects'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {
    fetchCollectionSuccess,
    fetchCollectionsFailure
} from './shop.actions'

import ShopActionTypes from './shop.types'

/**
 * All of the Asynchronous Actions of fetching data from the database
 * will now be moved here at "fetchCollectionsAsync()" generator function
 */
export function* fetchCollectionsAsync(){
    yield console.log('fetchCollectionsAsync starts...')

    try {
        const collectionRef = firestore.collection('collections')

        // Below "yield" code is very similar to "async/await"
        const snapshot = yield collectionRef.get()
        console.log("snapshot.docs: ", snapshot.docs)

        // "call()" method is just invoking the function inside of the argument
        //      It's purpose is when the function you wanna call actually might take
        //      longer time to process. Like Mapping arrays to Object, etc.
        // argv1 -the function you want to call
        // argv2,..., argv(n) - subsequent arguments are the arguments you passed to the function
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        console.log("collectionsMap: " , collectionsMap )

        yield put(fetchCollectionSuccess(collectionsMap))

    } catch(err) {
        yield put(fetchCollectionsFailure(err.message))
    }

    /**
    collectionRef.get()
        .then((snapshot) => {
        console.log("snapshot.docs: ", snapshot.docs)
        // calling the converter util from firebase.utils.js
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

        console.log("collectionsMap: " , collectionsMap )
                // pushing SHOP DATA from firebase to Redux store

        dispatch(fetchCollectionSuccess(collectionsMap))
        // pushing SHOP DATA from firebase to Redux store

        this.setState({loading: false})
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    */
}


export function* fetchCollectionsStart() {
    /**
     * takeEvery() listens to a specific "Action Types" that we want
     * and that is the argv1 -
     *
     * argv2 - another "generator" function that will run in response
     *      to the first Action Type we send to "takeEvery"
     */
    // yield takeEvery( //=> using the takeLatest instead to wait fetching of data to finish
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}

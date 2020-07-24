import ShopActionTypes from './shop.types'

import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils'

// export const updateCollections = ( collectionsMap ) => ({

//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap

// })

export const fetchCollectionsStart = ( collectionsMap ) => ({

    // here we are not going to put any Payload.
    // SInce all this does is to switch the "shop.reducer's" state
    // "isFetching" to TRUE
    type: ShopActionTypes.FETCH_COLLECTIONS_START,

})

// The collectionsMap payload is actually the returned SHOP_DATA
// which is already formatted by "convertCollectionsSnapshotToMap"
// from our firebase.utils.js
export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})



/**
 * Code below for fetchCollectionsStartAsync no longer needed because of the
 * Redux-saga implementation
 */
// this will be the actual function that we pass in to the "COMPONENT"
// that will initiate the actual fetching
export const fetchCollectionsStartAsync =  () => {

    // inside of this function is where will put all of the "ASYNCHRONOUS FUNCTION"
    // that was on the "shop.component"
    return (dispatch) => {

        const collectionRef = firestore.collection('collections')

        // using the dipsatch here. ANd we're able to do this because of
        // Redux-Thunk
        dispatch(fetchCollectionsStart())


        collectionRef.get()
            .then((snapshot) => {
            console.log("snapshot.docs: ", snapshot.docs)
            // calling the converter util from firebase.utils.js
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

            console.log("collectionsMap: " , collectionsMap )
            dispatch(fetchCollectionSuccess(collectionsMap))
            // pushing SHOP DATA from firebase to Redux store
            //   updateCollections(collectionsMap)

            this.setState({loading: false})
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}

/**
 * If you would notice the way that fetchCollectionsStartAsync works is that
 * similar to Vuex Store's calling of the "dispatch" from it's action methods
 */
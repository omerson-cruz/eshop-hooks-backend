import { createSelector } from 'reselect'


/**
 * No need of ID Mapping because of Data Normalization
 */
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// NOTE how we are wrapping the "createSelector" with another arrow function
// in order to pass the value of "collectionUrlParam" from the url path
export const selectCollection = collectionUrlParam =>
    createSelector(
      [selectCollections],
      collections =>
        // return null if not existing then it will render an empyt copmonent
        // or in other words it will not be rendered
        ( collections ? collections[collectionUrlParam] : null )
    )


/**
 * Creating a new selector that will convert "collections" keye'd normalized object
 * into an Array.
 */
 export const selectCollectionsForPreview = createSelector(
     [selectCollections],
     // what Object.keys does is to return an array of keys of an object
     // in this case we intend to create an array of "keys" for this
     //     normalized object and then using map to re-create the
     //     object in an Array format
     collections => {
         // so this is conversion of "keyed" Object or Map Object into an Array
         return collections ?
            Object.keys(collections).map(key => collections[key])
            // return an empty array if the "collections" is not yet fetched
            // from the firebase database
            : []
     }
 )

 // selecting our SHOP_DATA fetched using the Redux-Thunk
 export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
 )


 export const selectIsCollectionsLoaded = createSelector(
     [selectShop],
     // Algorithm for "converting a value to a Boolean value using the double !!"
     // So it will return "TRUE" or "FALSE" whether shop.collections is EMPTY object or NOT
     shop => !!shop.collections
 )
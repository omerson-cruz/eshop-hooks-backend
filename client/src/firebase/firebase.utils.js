import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCrwgfM96cxddvN24agab5XZdiKjWFBHwI",
    authDomain: "eshop-trading.firebaseapp.com",
    databaseURL: "https://eshop-trading.firebaseio.com",
    projectId: "eshop-trading",
    storageBucket: "eshop-trading.appspot.com",
    messagingSenderId: "330010395179",
    appId: "1:330010395179:web:653b122c1c1a15139ea06e"
}

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return  // if we signed Out then exit from the function

    // userRef is the documentRef for users document
    // because userAuth knows and returns the "uid" too which is linked to Authentication of Google
    const userRef = firestore.doc(`/users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    console.log('snapShot: ', snapShot)

    if(!snapShot.exists) {  // if does not exist then we wanna create the user in the database
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            // we are now going to add the user
            await userRef.set({
                displayName,    // from googleAuth or Sign Up
                email,          // from googleAuth or Sign UP
                createdAt,      // from googleAuth or Sign Up
                ...additionalData   // from Sign Up
            })

        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    // let's return the userRef since it might be used for something else
    return userRef

}

/**
 * This is a UTIL for adding SHOP_DATA or importing data into our Firebase
 *
 *  We would like to call this "addCollectionAndDocuments" in our component
 *  where it will be fired once and will have access to SHOP_DATA.
 * Therefore the best place to put this function is in App.js file.
 * And after we updated our data in our firestore. We wanted to remove this code
 * we are ONLY using this at ONCE time
 */

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // so here we are going to create the collection using the collection key
    const collectionRef = firestore.collection(collectionKey)
    console.log(collectionRef)
    // if "collectionRef" does not exist. If for example we are just starting empty
    // then firebase will automatically add it on the firebase firestore

    // using batch function to send all of our "set" request for all the Documents
    // in the SHOP_DATA collection
    const batch = firestore.batch()
    objectsToAdd.forEach(obj => {
        // what collectionRef.doc does is our App telling firebase to give
        // us a new "reference" to an empty Document reference on this collection Reference
        // and then randomly generate an ID for the document we are about to create
        const newDocRef = collectionRef.doc()  //==> with doc()  empty firestore will set a random key
        /**
         * you can also pass a string to .doc() method
         * that will serve as the "key" of the  document to be created
         */
        // const newDocRef = collectionRef.doc( obj.title )
        batch.set(newDocRef, obj)
    })

    return await batch.commit() // this will batch call all of the New Documents that we have created
    // what commit will return is a Promise that when commit succeeds it will come back adn resolve a
    // void value if successful


}
/*   addCOllectionAndDOcuments - END   */


/**
 * [16-8@11:35]
 * Utils for Converting the SHOP_DATA collections from firebase into
 * Array of Shop data Collections
 */
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const { title , items } = doc.data()

        return {
            // we use encodeURI here because routeName is gonna be used on the URL route
            // to ensure that our browser will understand this
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    console.log(transformedCollection)

    // Doing the Data Normalization from the Array of transformedCollection
    // THis is another Array to Object Algorithm
    return transformedCollection.reduce((accumulator, collection ) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }
    , {})
}
/*  convertCollectionsSnapshotToMap - END */

/**
 * Utility for Promise Based User Session Authentication
 * THis is utility for the "12. Recreating Persistence"4
 *
 * Remember: we're just mimiccking functionality thay you may encounter
 * when you dont have Firebase as the backend
 */
export const getCurrentUser = () => {
    // we use promise here because our Sagas are just like async/await promises
    return new Promise((resolve, reject) => {
        //IF onAuthStateChanged is successful the "userAuth" will be passed
        // else it will use the argv2 which is the "reject" function of promise
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth)
        //remember that onAuhtStateChanged argv2 => is error callback handler
        //so err object will be just passed to reject function of Promise
        }, reject)
    })
}





firebase.initializeApp(config)

// for Google authentication and firestore
export const auth = firebase.auth()  // from 'firebase/auth'
export const firestore = firebase.firestore() // from 'firebase/firestore'

// this is the Google Sign in Popup (Observer pattern way)
// const provider = new firebase.auth.GoogleAuthProvider()
// provider.setCustomParameters({ prompt: 'select_account'})  // this will popup the Google Authentication sign in
// export const signInWithGoogle = () => auth.signInWithPopup(provider)
/** End - Google Authentication API Popup */
/**
 * Implementing Promise Based Google Sign iN POP UP
 */
export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account'})  // this will popup the Google Authentication sign in
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)




export default firebase







import {takeLatest, put, all, call} from 'redux-saga/effects'

import UserActionTypes from './user.types'

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils'

import {
    // googleSignInSuccess,
    // googleSignInFailure,
    // emailSignInSuccess,
    // emailSignInFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions'

// Adding the argv2's additionalData because we are passing it to
// firebase Utils because of our SIgn UP SAGA
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData)
        const userSnapshot = yield userRef.get()
        // put -> puts the regular flow to our normal Redux Actions
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* signInWithGoogle() {
    // anything that we write with an API could fail
    // that is why we need a "try catch" block always
    try{
        // here we use the Google SIgn in Pop UP API
        // and if it is success then we want to assign it to "userRef"
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
        // console.log(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapshot = yield userRef.get()
        // // put -> puts the regular flow to our normal Redux Actions
        // yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))

    } catch(err) {
        console.log("error saga: ", err)
        yield put(signInFailure(err))
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

/**
 * Email SIgnIN Sagas
 */

// Now we use that payload from EMAIL_SIGN_IN_START
export function* signInWithEmail({payload: {email , password}}) {
    try {
        // this "auth.signInWithEmailAndPassword( )" will actually return us the
        // same object as the "auth.signInWithPopup(googleProvider)"
        // so we can just use the same logic
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
        // console.log(user)
        // const userRef = yield call(createUserProfileDocument, user)
        // const userSnapshot = yield userRef.get()
        // // put -> puts the regular flow to our normal Redux Actions
        // yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }))

    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail  //=> this will automatically pass the payload from the
                         // EMAIL_SIGN_IN_START Action Generator
    )
 }


 /**
  * CHeck User Session
  */
export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        // if user is not logged in or "userAuth" is null
        // then return do nothing
        if (!userAuth) return

        // if logged in. Then use the helper function to "SET CURRENT USER"
        // IN THE REDUX STORE
        yield getSnapshotFromUserAuth(userAuth)

    } catch (error) {
        yield put(signInFailure(error))
    }
}


 export function* onCheckUserSession() {
     yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    )
 }

 /**
  * Sign out Sagas
  */
export function* signOut() {
    try {
        console.log("signOUt")
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOut
    )
}

/**
 * SIGNIN UP Sagas
 *
 *  "userCredentials is the SIGN_UP_START" actions payload
 */

// export function* signUp(userCredentials) {  //=> destructured below
export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword( email, password )
        // "signUpSuccess" will trigger the next saga for Signup
        // which will sign In user after
        yield put(signUpSuccess(
            {
                user,
                additionalData : { displayName }
            })
        )
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

 export function* onSignUpStart() {
     yield takeLatest(
         UserActionTypes.SIGN_UP_START,
         signUp
     )
 }

/**
 * creating another saga for sign up success
 * This will trigger the automatic sign in of user
 *  when successfully signed up
 */
export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

/**
 * ALL USER SAGA
 */
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}


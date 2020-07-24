import UserActionTypes from './user.types'

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
    // We dont need a payload here because here we're just telling saga
    // that we just need to TRIGGER our sign in
})

// export const googleSignInSuccess = (user) => ({
//     type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
//     payload: user
// })

// export const googleSignInFailure = (error) => ({
//     type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
//     payload: error
// })


// The difference with our "Email Sign in" is that we have to pass in a
// Password. WE pull it out of our state and we pass it into the firebase utils
// So our email sign in will take an email and password value
export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

// export const emailSignInSuccess = (user) => ({
//     type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
//     payload: user
// })

// export const emailSignInFailure = (error) => ({
//     type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
//     payload: error
// })

/**
 * Merging google and email sign in success + failure
 * Because they are the exact same thing
 */

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

/**
 * Sign Out Actions
 */
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

/**
 * Sign Up Actions
 */
export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

/**
 * You maybe wondering why separate user and additionalData??
 * instead of just one object? Well it's because of readablity of code
 */
export const signUpSuccess = ({ user, additionalData}) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: { user, additionalData}
})

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})



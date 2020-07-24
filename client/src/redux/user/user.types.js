const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
    // GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
    // GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE',
    EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
    // EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
    // EMAIL_SIGN_IN_FAILURE: 'EMAIL_SIGN_IN_FAILURE',

    /** merging EMAIL and GOOGLE Sign In and Goole Sign In
     * Success and Failure
     */
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

    /**
     * Checking for user session (persistence)
     */
    CHECK_USER_SESSION: 'CHECK_USER_SESSION',

    /**
     * Sign out Redux Saga
     */
    SIGN_OUT_START: 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',


    /**
     * Sign up Redux Saga
     */
    SIGN_UP_START: 'SIGN_UP_START',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'

}

export default UserActionTypes
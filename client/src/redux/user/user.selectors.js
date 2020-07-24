import { createSelector } from 'reselect'


// for best practices always start from the "state" then the specific reducer
// in this case we are selecting the reducer "user"
const selectUser = state => { return state.user}



/**
 * WARNING the below code gave me headache because of that "selectCurrentUser"
 */
// export const selectCurrentUser = createSelector(
//    //[selectUser],       // this is the return value of "state.user"
//    // this array can also be re-written as successive arguments
//     [selectUser],

//     (user) => user.selectCurrentUser
// )

// here we are using multiple selectors from "cart" and "user" reducers
export const selectCurrentUser = createSelector(
   //[selectUser],       // this is the return value of "state.user"
   // this array can also be re-written as successive arguments
    [selectUser],

    (user) => {
        console.log("selectCurrentUser called")
        console.log("user: ", user)
        return user.currentUser
    }
)

import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

// const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
//     return isLoading ? (
//         <SpinnerOverlay>
//             <SpinnerContainer />
//         </SpinnerOverlay>
//     ) : (
//         <WrappedComponent />
//     )
// }

// to make the above more readable it is actually equivalent to the below code
const WithSpinner = WrappedComponent => {

    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        )
    }
    // So WithSpinner is an HOC that return a function (Spinner)
    // which then this Spinner function wraps the "<WrappedComponent />"
    return Spinner
}

export default WithSpinner


import styled, { css } from 'styled-components'

// this is for the general styling of our buttons
const buttonStyles = css`
    background-color: black;
    color: white;
    border: none;

    /* As you can see we have the benefits of "SASS/SCSS" too :))) */
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
`
// this is for the "invertedStyle" of button
const invertedButtonStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    /* As you can see we have the benefits of "SASS/SCSS" too :))) */
    &:hover {
    background-color: black;
    color: white;
    border: none;
    }
`

// this is for the GoogleSIgn In style
const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover {
    background-color: #357ae8;
    border: none;
    }
`

// now let's right the programmatic way of choosing
// which styling to apply up above.
// Wether it will be "googleSignIn" or "invertedButtonStyles"
/**
 * ALso note how we are also accepting the "props" here which
 * is the props being passed to the "custom-button.component.jsx" also
 */
const getButtonStyles = (props) => {
    // console.log("custom-button", props)
    if (props.isGoogleSignIn) {
        return googleSignInStyles
    }

    return props.inverted ? invertedButtonStyles : buttonStyles
}


// this will be our BASE style for ALL the button
export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;

    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;

    cursor: pointer;
    display: flex;
    justify-content: center;

    /* Now we can call a function here to determine if it will be
        inverted styling or "googleSIgnIn" styling
    */
    ${getButtonStyles}
`
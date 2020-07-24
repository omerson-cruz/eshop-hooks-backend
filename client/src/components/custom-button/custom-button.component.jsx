import React from 'react'
import {CustomButtonContainer} from './custom-button.styles'

// import './custom-button.styles.scss'  //==> already using custom-button.styles.jsx

// const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
const CustomButton = (props) => (
    <CustomButtonContainer
        {...props}
    >
        {props.children}
    </CustomButtonContainer>
)

export default CustomButton

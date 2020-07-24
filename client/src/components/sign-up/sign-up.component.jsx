import React, {useState} from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

// Implementation of Redux Saga for Sign up
import { signUpStart} from '../../redux/user/user.actions'
import { connect } from 'react-redux'

// class SignUp extends React.Component {
//     constructor() {
//         super()

//         this.state = {
//             displayName: '',
//             email: '',
//             password: '',
//             confirmPassword: ''
//         }
//     }

/**
 * Converting to React Hooks - Funtional Component
 */

const SignUp = ({signUpStart}) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {displayName, email, password, confirmPassword} = userCredentials

    /**
     * Using ES6 Syntax for "class" method so
     * we dont have to use the "this.bind for handleSubmit"
     */
    // handleSubmit = async event => {
    const handleSubmit = async event => {
        event.preventDefault()
        // const { signUpStart} = this.props
        // const {displayName, email, password, confirmPassword} = this.state

        if (password !== confirmPassword){
            alert('passwords dont match ')
            return
        }

        /**
         * Implementing the SAGA Sign Up Pattern
         */
        signUpStart({displayName, email, password})

    }

    // (Note we are using arrow function to bind handleChange to this Class object)
    // handling the input change
    // handleChange = event => {
    const handleChange = event => {
        const { name, value } = event.target

        // this.setState({ [name] : value })
        setUserCredentials({ ...userCredentials, [name] : value })

    }

    /**
     * Converting to React Hooks
     */
    // render() {
    // const {displayName, email, password, confirmPassword} = this.state

    return (
        <div className='sign'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign Up with your Email and Password</span>

            {/* <form className='sign-up-form' onSubmit={this.handleSubmit}> */}
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    // onChange={this.handleChange}
                    onChange={handleChange}
                    label='Display Name'
                ></FormInput>

                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    // onChange={this.handleChange}
                    onChange={handleChange}
                    label='Email'
                ></FormInput>

                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    // onChange={this.handleChange}
                    onChange={handleChange}
                    label='Password'
                ></FormInput>

                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    // onChange={handleChange}
                    onChange={handleChange}
                    label='Confirm Password'
                ></FormInput>

                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>

        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials ) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps) (SignUp)
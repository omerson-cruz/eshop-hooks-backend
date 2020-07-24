import React from 'react'

import './signin.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

// Promise Based Redux Saga- Google Sign in
import { googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import {connect } from 'react-redux'

// Converting this Component to REact Hooks
import {useState} from 'react'

// class SignIn extends React.Component {
    // constructor() {
    //     super()

    //     this.state = {
    //         email: '',
    //         password: ''
    //     }
    // }

/**
 * Using React Hooks and Converting Class based to Functional Components
 */
const SignIn = ({emailSignInStart, googleSignInStart}) => {

    // Here we are not separating "email" and "password" from a single object
    // But as a good React Hook practice we should always have single variable on
    // useState and NOT an object as much as possible
    const [userCredentials, setCredentials] = useState({email: '', password: ''})

    const {email, password} = userCredentials

    const handleSubmit = async (e) => {


         /**
         * Implementing Redux Saga for Email Sign In
         */
        // const {email, password} = this.state
        // const {emailSignInStart} = this.props

        /**
         * Converting to React Hooks
         */
        e.preventDefault()

        emailSignInStart(email, password)
    }


    const handleChange = (e) => {
        const { value, name } = e.target
        // this.setState({ [name]: value })
        /**
         * Converted to React Hooks
         */
        // this.setCredentials({...userCredentials,  [name] : value})
        setCredentials({...userCredentials,  [name] : value})
    }

    /**
     * Converted to Functional Components - REact Hooks
     */
    // render() {

    /**
     * Converted to React Hooks
     */
    // const {googleSignInStart} = this.props //==> directly extracted from props



    return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                {/* <form onSubmit={this.handleSubmit}> // converted to React Hooks */}
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        name='email'
                        // onChange={this.handleChange}
                        // value={this.state.email}
                        onChange={handleChange}
                        value={email}
                        label="email"
                        required
                    />
                    {/* <label>Email</label> */}
                    <FormInput
                        type="password"
                        name='password'
                        // value={this.state.password}
                        // onChange={this.handleChange}
                        value={password}
                        onChange={handleChange}
                        label="password"
                        required
                     />
                    {/* <label>Password</label> */}

                    <div className='buttons'>
                        <CustomButton type="submit">SIGN IN</CustomButton>

                        <CustomButton type='button'onClick={googleSignInStart} isGoogleSignIn>
                            SIGN IN WITH GOOGLE
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)

import React from 'react'

import './signin.styles.scss'
import SignIn from '../../components/signin/signin.component'
import SignUp from  '../../components/sign-up/sign-up.component'

const SignInPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
)

export default SignInPage
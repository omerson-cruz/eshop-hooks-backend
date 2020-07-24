import React from 'react'
// router related import
// import { Link } from 'react-router-dom'
// redux-related import
import { connect } from 'react-redux'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

import { auth } from '../../firebase/firebase.utils'

// shopping icon
import CartIcon from '../cart-icon/cart-icon.component'
// cart dropdown
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
// using selectors
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selectors'

// Sign OUt Redux Saga style
import {signOutStart } from '../../redux/user/user.actions'

// using styled CSS in JS
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionDiv,
    OptionLink
} from './header.styles'


const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/contact'>CONTACT</OptionLink>

        {
            currentUser ?
            (
                /* removing OptionDiv instead we are using the "OptionLink as='div' " */
                /* <OptionDiv onClick={() => auth.signOut() }>SIGN OUT</OptionDiv> */


                /* NOw we are using SIGN OUT REDUX SAGA STYLE  */
                /* <OptionLink as='div' onClick={() => auth.signOut() }>SIGN OUT</OptionLink> */
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
            )
            :
            <OptionLink to='/signin'>SIGN IN</OptionLink>
        }

        {/* <Cart currentUser={currentUser} /> */}

        <CartIcon />
        </OptionsContainer>
        {/* <CartDropdown /> */}
        {
            !hidden && (<CartDropdown />)
        }

    </HeaderContainer>
)

// mapToStateProps is just a function that returns an object where the name of the property is the property you wanna pass in As PROP to the component

// argv1 - " state of the whole root reducer" or the root reducer
// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser
// })

// advanced destructuring of nested objects to get the "currentUser" and "hidden"
//      from multiple reducers namely the user and cart reducer
// const mapStateToProps = (state) => ({
//     // currentUser : currentUser,
//     // hidden: hidden
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// })

// using "createStructuredSelector" for multiple selector
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

// using signOut Redux Saga style
const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

// connect has 2 function arguments, the 2nd one being optional
//  it will return another function where we pass or feed in the Header component
// argv1 - is a function that allows us to access the states (the reducers) or the root reducer to be exact.
export default connect(mapStateToProps, mapDispatchToProps)(Header)
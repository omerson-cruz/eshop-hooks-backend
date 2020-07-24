import React from 'react'
import './cart-dropdown.styles.scss'
import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// using cart selector
import { selectCartItems } from '../../redux/cart/cart.selector'
import { createStructuredSelector} from 'reselect'

// using react-router-dom
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const Cart = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map(cartItem => {
                    console.log("cartItem: ", cartItem)
                    return (<CartItem key={cartItem.id} item={cartItem}></CartItem>)
                })
                :
                <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton
            onClick={() => {
                history.push('/checkout')
                dispatch(toggleCartHidden())
            }}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
)

// using the cartItem selector that's why we need to pass the
//   WHOLE STATE
// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(Cart))
import React from 'react'
import {ReactComponent as ShoppingIcon }from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

// to use the cart-reducer's hidden
import { connect } from 'react-redux'
import {toggleCartHidden } from '../../redux/cart/cart.actions'

// using the memoi selectors
import {selectCartItemsCount} from '../../redux/cart/cart.selector'
import {createStructuredSelector} from 'reselect'


const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'> {itemCount} </span>
    </div>
)


const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

// using the selector and we are passing the WHOLE state to
// the selector
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps) (CartIcon)


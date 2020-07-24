import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100

    // the publishable key from STRIPE API page
    const publishableKey = 'pk_test_NtveQH2AaNRT2cQWH6K3AePt00VWCFsAQB'

    //onToken is the one that's gonna send messag to our backend
    // and then compeletely process the "charging of the customer"
    const onToken = token => {
        console.log(token)
        axios({
            url: '/payment', // axios already knows that we are doing it on /payment
            method: 'post',
            data: {
                amount: priceForStripe,
                token  // this is the token we pass to our Backend
            }
        })
        .then(response =>  {
            alert('Payment Succesful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error))
            alert('There was an issue with your payment. Please make sure you provided the credit card')
        })

    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Eshop'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken} // this will call the "token" function handler
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton
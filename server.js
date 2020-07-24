const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

if (process.env.NODE_ENV !== 'production'){
    // it loads our dotenv and access that SECRET KEY
    require('dotenv').config()
} // if we are in DEV Mode

// after setting UP the SECRET KEY we are going to use the
// Stripe library. This will return a stripe object that will be assigned
// to our "stripe variable"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// instantiate a new express application
const app = express()
// use env.PORT in prod then 5000 in DevMode
const port = process.env.PORT || 5000

// automatically converts incoming requests from string to JSON
app.use(bodyParser.json())
// to properly escape character sequences that URL syntax understands
app.use(bodyParser.urlencoded({extended: true}))
// this just basically allows our requests from Front end w/c is from port 3000
// to the port 5000 which is our Backend Server
app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    // this is basically telling that for every kind of URL route that
    // the user Hits then point to this app.get()
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// this will handle the actual payment
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'php'
    }

    /**
     * argv1 - body information of the request
     * argv2 - callback function with 2 arguments
     *      cb.argv1 - stripeErr object
     *      cb.argv2 - stripe Response object for success API call
     */
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            return res.status(500).send({error: stripeErr})
        } else {
            res.status(200).send({success: stripeRes})
        }
    })
})


app.listen(port, error => {
    if(error) throw error
    console.log('server running on port: ', port)
})
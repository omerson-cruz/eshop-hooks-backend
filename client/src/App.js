import React, {useEffect} from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInPage from './pages/signin/signin.component'
import CheckoutPage from './pages/checkout/checkout.component'

// redux-related imports
import {connect } from 'react-redux'

// using reselect for memoiz selectors
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './redux/user/user.selectors'

// User Actions
import { checkUserSession } from './redux/user/user.actions'


/**
 * COnverting our Class App into Functional App component
 */
// class App extends React.Component {

const App = ({checkUserSession, currentUser, ...otherProps}) => {

  // componentDidMount() {
  //   const {checkUserSession} = this.props
  //   checkUserSession()

  // }


  // mimicking the "componentDidMount"
  useEffect(() => {
    checkUserSession()

    /**
     * putting checkUserSession in an array even though it is a function
     * @03:00 - Yihua said that since APp.js is the highest or toppes component
     * this is perfectly fine. And also since "checkUserSession is coming from
     * an object that from the mapDispatchToPRops
     *
     * But if checkUserSession is a property that we are passing in from another
     * parent component then behaviour will be different. And we should put another
     * kind of logic
     *
     * Also this will prevent the "checkUserSession" from being fired off TWICE
     */
  }, [checkUserSession])

  /**
   * Converting App to REact Hooks - Functional Component
   */
  // render () {

  console.log('render App->props: ', otherProps)

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* the reason we are not putting "exact" for the /shop route is because
            we will have subroutes for /shop like "/shop/hats" , "/shop/jackets", etc.
          */}
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/signin"
          render={() =>{
              console.log('App-> otherProps: ', otherProps)
              // return this.props.currentUser ? (<Redirect to='/' />) : (<SignInPage />)
              return currentUser ? (<Redirect to='/' />) : (<SignInPage />)

            }}
        />

      </Switch>
    </div>
  );

}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
})

/**
 * Recreating mapDispatchToProps to use the Redux Saga
 */
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {useEffect} from "react";

import { Route } from "react-router-dom"
import { connect } from 'react-redux'

// using Container Pattern
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from "../collection/collection-page.container";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";


/**
 * Converting to React Hooks - Functional Component
 */
// class ShopPage extends React.Component{
  const ShopPage = ({fetchCollectionsStart, match}) => {

  // componentDidMount() {
  //   // implementing Redux-saga
  //   const { fetchCollectionsStart } = this.props
  //   fetchCollectionsStart()
  // }

  /**
   * Using useEffect instead of the "componentDidMount"
   * @05:40 - NOw is the best time to talk about the useEffect in shop.component
   * because that's one of the big caveats with the useEffect is how it fires
   * and when we want it to. Because it might cause some side effects that we dont want
   *
   * We know that our useEffect or our Shop will only re-render whenever we
   * call "setState" or if our Props change, OR IF THE PARENT OF THE shop.component
   * which is our App.js ends up calling it's own re-render
   *  - and the time we know that it is going to happen is when the "useEffect" on the
   *    App.js is called due to the persistence of the"currentUser"
   *  - And if we dont listen to that kind of change then we will end up calling the
   *    useEffect TWICE here in "shop.component" as well even though there is no change
   *    here on this component
   *
   * CONCLUSION: is to put "fetchCollectionStart" also in the array if it detects
   * that there is actually no changes from the Parent Component
   */
  useEffect(() => {
    fetchCollectionsStart()
  },[fetchCollectionsStart])


  /**
   * Converting to React Hooks - Functional Component
   */
  // render () {

    // const {match} = this.props

    return (
      <div className="shop-page">

        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />


        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage)

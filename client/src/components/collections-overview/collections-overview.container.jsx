// Let's import all the necessary stuffs to make the "Collections Overview"
// component worked
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// using compose to have better readability for our
// CONTAINER PATTERN
import { compose } from 'redux'

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors.js'
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collections-overview.component'


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})


// THis is NOT READABLE so we are going to use the "compose" from redux library
// export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))

/**  // this code is similar to above
 * "compose " function evaluates from right to left
 * - so first CollectionsOverview will be evaluated with
 *   1. WithSPinner first
 *   2. then connect(mapStateToProps)
 */
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer



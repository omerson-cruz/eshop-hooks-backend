 import {connect} from 'react-redux'
 import {compose} from 'redux'
 import {createStructuredSelector} from 'reselect'

 import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'
 import WithSpinner from '../../components/with-spinner/with-spinner.component'
 import CollectionPage from './collection.component'

 const mapStateToProps = createStructuredSelector({
     // we are using a function here so that we can reverse the "value"
     // using the NOT "!" operator. that's the whole point of using the
     // function call here
     isLoading: (state) => !selectIsCollectionsLoaded(state)
 })

 const CollectionPageContainer = compose(
     connect(mapStateToProps),
     WithSpinner
 )(CollectionPage)


 export default CollectionPageContainer
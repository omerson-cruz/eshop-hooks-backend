import React , {useEffect} from 'react'
import { connect } from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import {selectCollection } from '../../redux/shop/shop.selectors'

import './collection.styles.scss'

/**
 * Importing firestore for useEffect cleanup demo purpose only
 */
// import {firestore} from '../../firebase/firebase.utils'


// now the match here is coming and being passed up above by te "shop.component.jsx"
// page component
const CollectionPage = ({collection}) => {

    // useEffect(() => {
    //     console.log('I am subscriber')
    //     const unsubsribeFromCollections = firestore.collection('collections').onSnapshot(
    //         async snapshot => console.log(snapshot)
    //     )

    //     // This is a cleanup function. So this is like "componentWillUnmount"
    //     // so we can use it for example with Firebase we are using the "subscribe"
    //     // and "Unsubscribe" from firebase
    //     return () => {
    //         console.log('I am unsbcribing')
    //         unsubsribeFromCollections()
    //     }
    // }, [])


    const { title, items } = collection

    return (
    /**
     * match has the property called "params" which contains the
     *  "categoryId:" which was passed from the parent Route component from
     *  shop.component.jsx page
     */

    <div className='collection-page'>
        <h2 className='title'>{ title } </h2>
        <div className='items'>
        {
            items.map(item => (
                <CollectionItem key={item.id} item={item} />
            ))
        }
        </div>
    </div>
)}


/**
 * Note here we are using the "argv2 - ownProps"
 * that is the props of the component itself. We are using this in order
 * to get the "match.params.collectionId"
 *
 * Also notice that selectCollection is returning another selector function
 * which in turn we are passing the "state"
 */
const mapStateToProps = (state, ownProps) =>  ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)


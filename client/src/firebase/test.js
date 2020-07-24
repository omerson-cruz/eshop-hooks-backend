import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()

// This is how you query your collections in firestore
firestore.collection('users').doc('7f8has5sWw59KOQWIOOO').collection('cartItems')
    .doc('468QrHoh3UyI9FMTkLG7')

// another way of querying our data
firestore.doc('/users/7f8has5sWw59KOQWIOOO/cartItems/468QrHoh3UyI9FMTkLG7')
// if you want collection then jsut simply say
firestore.collection ('/users/7f8has5sWw59KOQWIOOO/cartItems')

const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyA8lUtV2CpQABZ0lF4xAhoJuC6qrEMxgVQ",
    authDomain: "cari-in-1.firebaseapp.com",
    databaseURL: "https://cari-in-1-default-rtdb.firebaseio.com",
    projectId: "cari-in-1",
    storageBucket: "cari-in-1.appspot.com",
    messagingSenderId: "1032811047942",
    appId: "1:1032811047942:web:39cd916ddbcf60abd32787"
  };

firebase.initializeApp(firebaseConfig)

module.exports = firebase
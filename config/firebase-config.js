import firebase from 'firebase';
var firebaseConfig = {
  apiKey: 'AIzaSyADnu_3A65YQleoEe1j_Gm4jiZuTqHs-zA',
  authDomain: 'iot-app-fec40.firebaseapp.com',
  databaseURL: 'https://iot-app-fec40.firebaseio.com',
  projectId: 'iot-app-fec40',
  storageBucket: 'iot-app-fec40.appspot.com',
  messagingSenderId: '810721748547',
  appId: '1:810721748547:web:56165f09b32e12f54916f6',
  measurementId: 'G-8CP3795Q76'
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
export default firebase;
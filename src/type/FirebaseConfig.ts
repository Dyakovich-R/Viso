// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXcoJnmsb8H9bv6EiaJ5hjwD8Eou6cD0g',
  authDomain: 'maps-72bb9.firebaseapp.com',
  projectId: 'maps-72bb9',
  storageBucket: 'maps-72bb9.appspot.com',
  messagingSenderId: '308974352197',
  appId: '1:308974352197:web:32a2d7e7ff23dbbb83f02c',
  measurementId: 'G-8LD9T06522',
  databaseURL: 'https://maps-72bb9-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db}

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBqGBSNp-ZUvFpINf_tkgINnJ4o4cxlDr8",
    authDomain: "trend-dfc98.firebaseapp.com",
    projectId: "trend-dfc98",
    storageBucket: "trend-dfc98.firebasestorage.app",
    messagingSenderId: "170249865041",
    appId: "1:170249865041:web:93c14309bd7c54edb43570",
    measurementId: "G-M5CFBD7L1E"
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
export var db = getFirestore(app);
// Helper function for logging events
export var logAnalyticsEvent = function (eventName, params) {
    console.log("[Analytics Event] ".concat(eventName, ":"), params);
};

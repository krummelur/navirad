import "firebase/auth";
import {firebaseConfig} from "../data/apiConfig";

const firebase = require("firebase/app");

const fireBaseApp = firebase.initializeApp(firebaseConfig);

export default fireBaseApp;
import {firebaseConfig} from "../data/apiConfig";
import "firebase/auth";

const firebase = require("firebase/app");
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
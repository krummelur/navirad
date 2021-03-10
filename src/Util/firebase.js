import {firebaseConfig} from "../data/apiConfig";
import "firebase/auth";

const firebase = require("firebase/app");
const firebaseApp = firebase.default.initializeApp(firebaseConfig);

export default firebaseApp;
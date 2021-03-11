import {firebaseConfig} from "../data/apiConfig";

const firebase = require("firebase/app");
const firebaseApp = firebase.default.initializeApp(firebaseConfig);

export default firebaseApp;
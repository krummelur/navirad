import {firebaseConfig} from "../data/apiConfig";
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
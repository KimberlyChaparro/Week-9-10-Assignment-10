import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// replace this firebase conFigvariable with your own
const firebaseConfig = {
    apiKey: "AIzaSyDG_ia-XQBXdfdao5AQpz3AtmuZzJhS0Bs",
    authDomain: "week-7-assignment-8.firebaseapp.com",
    projectId: "week-7-assignment-8",
    storageBucket: "week-7-assignment-8.appspot.com",
    messagingSenderId: "455685684994",
    appId: "1:455685684994:web:a89105a784e725aa02cc1b",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
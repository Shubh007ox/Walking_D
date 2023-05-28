import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD569iNkhWZ_j_QiOm2Ffg55IsELbjyuSI",
  authDomain: "walikingd.firebaseapp.com",
  projectId: "walikingd",
  storageBucket: "walikingd.appspot.com",
  messagingSenderId: "272444001730",
  appId: "1:272444001730:web:08f9b71af19306bc62da5b",
  measurementId: "G-FPYR407XDY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export { auth, facebookProvider, googleProvider };

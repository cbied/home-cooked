import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-xJ4Gv7pGnPs4cQphv_PaSr1MAt97kp8",
    authDomain: "home-cooked-26550.firebaseapp.com",
    projectId: "home-cooked-26550",
    storageBucket: "home-cooked-26550.appspot.com",
    messagingSenderId: "824929701942",
    appId: "1:824929701942:web:2da01c08e8cbd1b9330897"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function addNewUser(userInfo) {
    //userInfo { firstName, email, password }
    try {
        const docRef = await addDoc(collection(db, "users"), userInfo)
        console.log(docRef)
    } catch (err) {
        console.error(err)
    }
}

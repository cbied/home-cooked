import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup, signOut, updateProfile  } from "firebase/auth";

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
export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export let currentUser = null;


export async function addNewUser(userInfo) {
  const { email, password, firstname } = userInfo
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
      const user = userCredential.user;
      alert(`Welcome ${firstname}!`)
  updateUserProfile(user, firstname)
  signInUserWithEmail(email, password)
  }).catch(err => console.error(err));
}

export async function signInUserWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user
  })
  .catch((error) => {
      console.log(error)
  });
}

function updateUserProfile(user, firstname) {
  updateProfile(auth.currentUser, {
      displayName: firstname, 
    }).then(() => {
      user.providerData[0].uid = user.uid
      addDoc(collection(db, "users"), user.providerData[0])
    }).catch((error) => {
      console.error(error)
    });
}

export async function signInUserWithGoogle() {
  return signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    updateUserProfile(user)
    return user
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ": " + errorMessage)
  });
}

export async function signOutUser() {
  signOut(auth).then(() => {
  // Sign-out successful.
  alert("Sign out successful");
  }).catch((error) => {
  console.log(error)
  });
}
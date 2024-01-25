import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";

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
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

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

function updateUserProfile(user, firstname) {
    updateProfile(auth.currentUser, {
        displayName: firstname, 
      }).then(() => {
        user.providerData[0].uid = user.uid
        console.log(user)
        addDoc(collection(db, "users"), user.providerData[0])
        
      }).catch((error) => {
        console.error(error)
      });
}

export async function signInUserWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        
    })
    .catch((error) => {
        console.log(error)
    });
}

export async function signInUserWithGoogle() {
signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error(error)
  });
}

export async function signUserOut() {
    signOut(auth).then(() => {
    // Sign-out successful.
    alert("Sign out successful");
    }).catch((error) => {
    // An error happened.
    });
}
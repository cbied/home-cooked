import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, setDoc, updateDoc, collection } from "firebase/firestore";
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
  const { email, password, displayName } = userInfo
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
      const userInfo = userCredential.user;
      console.log(userInfo)
      alert(`Welcome ${displayName}!`)
  updateUserProfile(userInfo, displayName)
  // FIX user does not automatically login after adding new user profile - may need to add redux thunk
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
      user.providerData[0].uid = auth.currentUser.uid
      setDoc(doc(db, 'users', user.uid), user.providerData[0])
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

export async function updateUserInfo(userInfo) {
  const { firstName, lastName, displayName, email, phoneNumber, photoURL } = userInfo;
  console.log(auth.currentUser.uid)
  const userDocRef = doc(db, "users", auth.currentUser.uid)

  await updateDoc(userDocRef, {
    firstName,
    lastName,
    displayName,
    email,
    phoneNumber,
    photoURL
});
}
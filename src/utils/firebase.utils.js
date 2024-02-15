import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
      if(user) {
        alert('Welcome back ' + user.displayName)
        return user
      }
  })
  .catch((error) => {
    console.log(error.code)
    if(error.code === "auth/invalid-login-credentials" || 
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential") {
        console.error(error.message)
        alert("Email or password is invalid")
        // user not found in db
        } else if (error.code === "auth/user-not-found") {
            console.error(error.message)
            alert("No user was found")
        } else {
            console.log('createAuthUserWithEmailAndPassword error: ', error)
        }
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
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
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

export async function updateUserInfoInFirebase(userInfo) {
  const { firstName, lastName, displayName, email, phoneNumber, photoURL } = userInfo;

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

export async function getUserInfoFromFirebase(currentUserUid) {
    const docRef = await doc(db, "users", currentUserUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { addNewUser, getUserInfoFromFirebase, signInUserWithEmail, signInUserWithGoogle,
         updateUserProfile, updateUserInfoInFirebase } from '../../utils/firebase.utils';
import { signupUserSuccess, signupUserFailed,
        signInUserWithEmailSuccess, signInUserWithEmailFailed, 
        signInUserWithGoogleSuccess, signInUserWithGoogleFailed,
        updateUserSuccess, updateUserFailed } from './user-slice';

function* signInUserSteps(data) {
    try {
        const user = yield call(signInUserWithEmail, data.payload.email, data.payload.password)
        if(data.payload.displayName) {
            yield call(updateUserProfile, user, data.payload)
        }
        const userInfo = yield call(getUserInfoFromFirebase, user.uid)
        yield put(signInUserWithEmailSuccess(userInfo))
        alert('Welcome ' + userInfo.displayName)
    } catch(error) {

    }
}

export function* onSignupUserStart() {
    yield takeLatest('user/signupUserStart', signupUser)
}

export function* signupUser(data) {
    try {
        yield call(addNewUser, data.payload)
        yield call(signInUserSteps, data)
        yield put(signupUserSuccess())
    } catch (error) {
        console.log(error)
        yield put(signupUserFailed(error))
    }

}

export function* onSignInUserWithEmailStart() {
    yield takeLatest('user/signInUserWithEmailStart', signInUserEmail)
}

export function* signInUserEmail(data) {
    try {
        yield call(signInUserSteps, data)
    } catch (error) {
        console.log(error)
        yield put(signInUserWithEmailFailed(error))
    }
}

export function* onGoogleSigninStart() {
    yield takeLatest('user/signInUserWithGoogleStart', signInUserGoogle)
}

export function* signInUserGoogle() {
    try {
        const result = yield call(signInUserWithGoogle) 
        const userResults = result.user
        yield call(updateUserProfile, userResults, userResults.providerData[0].displayName)
        const userInfo = yield call(getUserInfoFromFirebase, result.user.uid)
        yield put(signInUserWithGoogleSuccess(userInfo))
        alert('Welcome ' + userInfo.displayName)
    } catch (error) {
        console.log(error)
        yield put(signInUserWithGoogleFailed(error))
    
    }
}

export function* onGetCurrentUserInfoStart() {
    yield takeLatest('user/updateUserStart', updateCurrentUserInfo)
}

export function* updateCurrentUserInfo(data) {
    try {
        if(data) {
            yield call(updateUserInfoInFirebase, data.payload.userInfo.userInfo)
            yield call(getCurrentUserInfo, data.payload.userInfo.uid)
        }
    } catch (error) {
        console.log(error)
        yield put(updateUserFailed(error))
    }
}

export function* getCurrentUserInfo(uid) {
    try {
        if(uid) {
            const currUserInfo = yield call(getUserInfoFromFirebase,uid)
            yield put(updateUserSuccess(currUserInfo))
            alert('Your Information has been updated')
        }
    } catch (error) {
        console.log(error)
        yield put(updateUserFailed(error))
    }
}



// User Saga
export function* userSaga() {
    yield all([call(onGetCurrentUserInfoStart),
               call(onSignInUserWithEmailStart),
               call(onGoogleSigninStart),
               call(onSignupUserStart)])
    // TO ADD
    // yield all(
    //     [call(onCheckUserSession),
    //      call(onSignOutUser)
    //     ]);
}
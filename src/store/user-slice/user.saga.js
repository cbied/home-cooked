import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getUserInfoFromFirebase, signInUserWithEmail, signInUserWithGoogle } from '../../utils/firebase.utils';
import { signInUserWithEmailSuccess, signInUserWithEmailFailed, 
        signInUserWithGoogleSuccess, signInUserWithGoogleFailed,
        updateUserSuccess, updateUserFailed } from './user-slice';

export function* onGetCurrentUserInfoStart() {
    yield takeLatest('user/updateUserStart', getCurrentUserInfo)
}

export function* getCurrentUserInfo(data) {
    try {
        if(data) {
            const userInfo = yield call(getUserInfoFromFirebase, data.payload.currentUserUid)
            yield put(updateUserSuccess(userInfo))
            alert('Your Information has been updated')
        }
    } catch (error) {
        console.log(error)
        yield put(updateUserFailed(error))
    }
}

export function* onSignInUserWithEmailStart() {
    yield takeLatest('user/signInUserWithEmailStart', signInUserEmail)
}


export function* signInUserEmail(data) {
    try {
        const userInfo = yield call(signInUserWithEmail, data.payload.email, data.payload.password) 
        yield put(signInUserWithEmailSuccess(userInfo))
        alert('Welcome ' + userInfo.displayName)
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
        const userInfo = yield call(signInUserWithGoogle) 
        yield put(signInUserWithGoogleSuccess(userInfo))
        alert('Welcome ' + userInfo.displayName)
    } catch (error) {
        console.log(error)
        yield put(signInUserWithGoogleFailed(error))
    
    }
}

// User Saga
export function* userSaga() {
    yield all([call(onGetCurrentUserInfoStart),
               call(onSignInUserWithEmailStart),
               call(onGoogleSigninStart)])
    // TO ADD
    // yield all(
    //     [call(onCheckUserSession),
    //      call(onCreateUserAccount),
    //      call(onSignOutUser)
    //     ]);
}
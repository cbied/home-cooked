import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getUserInfoFromFirebase } from '../../utils/firebase.utils';
import { updateUserSuccess, updateUserFailed } from './user-slice';

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

// User Saga
export function* userSaga() {
    yield all([call(onGetCurrentUserInfoStart),
               call(getCurrentUserInfo)])
    // TO ADD
    // yield all(
    //     [call(onCheckUserSession),
    //      call(onGoogleSigninStart),
    //      call(onEmailSigninStart),
    //      call(onCreateUserAccount),
    //      call(onSignOutUser)
    //     ]);
}
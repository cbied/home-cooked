import { all, call } from 'redux-saga/effects'
import { userSaga } from './user-slice/user.saga'

function* rootSaga() {
	yield all([call(userSaga)])
}

export default rootSaga

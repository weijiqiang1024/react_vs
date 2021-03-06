/**
 * Created by zll on 2017/10/11.
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { dataService } from '../../utils/request';
import * as actMsg from '../actions/msgTip';
import * as act from '../actions/login';
import { config } from '../../utils/config'

function* loginSubmit(action) {
    try {
        // 数据请求参数构造
        let param = {
            reqUrl: dataService.reqUrl.login,
            reqAuth: '',
            reqParam: action.payload
        };
        const response = yield call(dataService.postRequest, param);
        debugger;
        //处理返回结果
        if (response) {
            if (response.data.code !== 0)
                yield put(act.loginFail());
            else {
                sessionStorage.setItem('access_token',response.data.data.token || '');
                sessionStorage.setItem('username',response.data.data.userData[0].username || '');
                yield put(act.loginSuccess(response.data.data.userData[0]));
            }
        }
    } catch (error) {
        //处理异常
        yield put(actMsg.optFail(error.message));
    }
}

export default function* loginSaga() {
    yield takeEvery(act.LOGIN_SUBMIT, loginSubmit); 

}


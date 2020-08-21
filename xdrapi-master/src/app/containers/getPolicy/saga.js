import { takeLatest, put, call } from "redux-saga/effects";
import { CALL_GET_POLICY_API } from "./constants";
import { getPolicyAPI } from "./api";
import { getPolicyAPISuccess, getPolicyAPIFailure } from "./action";
import { setLoading } from "../getIncidents/actions";
export function* getPolicy(data) {
  let body = {
  request_data: {
      endpoint_id: data.data.policy
    },companyId: data.data.companyId
  };
  try {
    const response = yield call(getPolicyAPI, body);
    if (response.status === 200) {
      yield put(getPolicyAPISuccess(response.data.reply));
    } else {
      yield put(getPolicyAPIFailure(response.message));
    }
    yield put(setLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const getPolicySaga = [takeLatest(CALL_GET_POLICY_API, getPolicy)];

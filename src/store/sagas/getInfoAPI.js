import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { GETCLUB_REQUEST, successClub, failClub } from "store/actions/getInfo";
import { GETDETAIL_REQUEST, successDetail, failDetail } from "store/actions/getInfo";
import { GETEDUCATION_REQUEST, successEducation, failEducation } from "store/actions/getInfo";
import { GETCONFERENCE_REQUEST, successConference, failConference } from "store/actions/getInfo";
import { fetchClubData, fetchDetail, fetchConferenceData, fetchEducationData } from "api";

function* getClubApiData() {
    try {
        // do api call
        const data = yield call(fetchClubData);
        yield put(successClub(data));
        console.log(data);
    } catch (e) {
        yield put(failClub());
        console.log(e);
    }
}

function* getConferenceApiData() {
    try {
        // do api call
        const data = yield call(fetchConferenceData);
        yield put(successConference(data));
    } catch (e) {
        yield put(failConference());
        console.log(e);
    }
}

function* getEducationApiData() {
    try {
        // do api call
        const data = yield call(fetchEducationData);
        yield put(successEducation(data));
    } catch (e) {
        yield put(failEducation());
        console.log(e);
    }
}

function* getDetail(payload) {
    try {
        // do api call
        const data = yield call(fetchDetail, payload.payload);
        yield put(successDetail(data));
    } catch (e) {
        yield put(failDetail());
        console.log(e);
    }
}

export default function* watchApiList() {
    yield takeLatest(GETCLUB_REQUEST, getClubApiData);
    yield takeLatest(GETCONFERENCE_REQUEST, getConferenceApiData);
    yield takeLatest(GETEDUCATION_REQUEST, getEducationApiData);
    yield takeLatest(GETDETAIL_REQUEST, getDetail);
}

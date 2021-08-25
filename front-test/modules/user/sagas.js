import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { backUrl } from '../../config/config';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = backUrl;


function loadPostsAPI() {
    return axios.get(`/posts`);
}

function* loadPosts() {
    try {
        const result = yield call(loadPostsAPI);
        console.log(result.data);
        yield put({
            type: 'LOAD_POSTS_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'LOAD_POSTS_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchLoadPosts() {
    yield takeLatest('LOAD_POSTS_REQUEST', loadPosts);
}
//-----------------------------------------------------------------

function uploadImgAPI(data) {
    return axios.post('/post/images', data);
}

function* uploadImg(action) {
    try {
        const result = yield call(uploadImgAPI, action.data);
        yield put({
            type: 'UPLOAD_IMAGES_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'UPLOAD_IMAGES_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchUploadImg() {
    yield takeLatest('UPLOAD_IMAGES_REQUEST', uploadImg);
}

//-----------------------------------------------------------------
function addPostAPI(data) {
    return axios.post(`/post`, data);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: 'ADD_POST_FAILURE',
            error: err.response.data,
        });
    }
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}
//-----------------------------------------------------------------
export function* rootSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchUploadImg),
        fork(watchAddPost),
    ]);
}

import axios from 'axios'
import { getRedirectPath } from '../utils/utils'

//actionTypes
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const UPDATE_INFO = 'UPDATE_INFO';
const DO_LOGOUT = 'DO_LOGOUT';

//reducer
const defaultState = {
	redirectTo: '',
	isAuth: false,
	msg: '',
	user: '',
	pwd: '',
	type: '',
	avatar: ''
}
export function user(state=defaultState, action) {
	switch(action.type) {
		case REGISTER_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
		case LOGIN_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
		case LOAD_DATA:
			return {...state, ...action.data}
		case UPDATE_INFO:
			return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
		case DO_LOGOUT:
			return {...defaultState, redirectTo: '/login'}
		case ERROR_MSG:
			return {...state, isAuth: false, msg: action.msg}
		default:
			return state;
	}
}


//actionCreators
export function errorMsg(msg) {
	return {type: ERROR_MSG, msg}
}

export const userInfo = (data) => ({
	type: LOAD_DATA,
	data
})

export function register({user,pwd,repeatpwd,type}) {
	if(!user || !pwd || !type) {
		return errorMsg('用户名密码不能为空');
	}
	if(pwd !== repeatpwd) {
		return errorMsg('两次输入的密码不一致');
	}
	return (dispatch) => {
		axios.post('/user/register',{user,pwd,type}).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				const action = {
					type: REGISTER_SUCCESS,
					data: {user,pwd,type}
				}
				dispatch(action);
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
}

export const doLogin = ({user, pwd}) => {
	if(!user || !pwd) {
		return errorMsg('用户名密码不能为空');
	}
	return (dispatch) => {
		axios.post('/user/login',{user,pwd}).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				const action = {
					type: LOGIN_SUCCESS,
					data: res.data.data
				}
				dispatch(action);
			} else {
				dispatch(errorMsg(res.data.msg));
			}
		})
	}
}

export const updateInfo = (state) => {
	return (dispatch) => {
		axios.post('/user/updateInfo', state).then(res => {
			if(res.status === 200 && res.data.code === 0) {
				dispatch({type: 'UPDATE_INFO', data: res.data.data})
			}else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export const logout = () => ({
	type: DO_LOGOUT
})
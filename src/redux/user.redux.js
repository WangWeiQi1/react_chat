import axios from 'axios'
import { getRedirectPath } from '../utils/utils'

//actionTypes
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

//reducer
const defaultState = {
	redirectTo: '',
	isAuth: false,
	msg: '',
	user: '',
	pwd: '',
	type: ''
}
export function user(state=defaultState, action) {
	switch(action.type) {
		case REGISTER_SUCCESS:
			return {...state, msg: '', redirectTo: getRedirectPath(action.data), isAuth: true, ...action.data}
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
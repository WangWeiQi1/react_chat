import axios from 'axios'

const USER_LIST = 'USER_LIST';

const defaultState = {
	userList: []
}

export function card(state=defaultState,action) {
	switch(action.type) {
		case USER_LIST:
			return {...state, userList: action.data}
		default: 
			return state;
	}
}

export const getUserList = (type) => {
	return (dispatch) => {
		axios.get('/user/list?type=' + type).then(res => {
			if(res.data.code === 0) {
				dispatch({type: USER_LIST,data: res.data.data})
			}
		})
	}
}
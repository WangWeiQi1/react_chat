import axios from 'axios'
import io from 'socket.io-client'
//由于跨域 要配置下
const socket = io('ws://127.0.0.1:9093');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const defaultState = {
	chatmsg: [],
	users: {},
	unread: 0
}

export function chat(state=defaultState,action) {
	switch(action.type) {
		case MSG_LIST:
			return {...state, chatmsg: action.data, users: action.users, unread: action.data.filter(v => !v.read && v.to === action.userId).length}
		case MSG_RECV:
			const n = action.data.to === action.userId ? 1 : 0;
			return {...state, chatmsg: [...state.chatmsg, action.data], unread: state.unread + n}
		case MSG_READ:
			const { from, num } = action.data;
			return {...state, chatmsg: state.chatmsg.map(item=>({...item, read: from === item.from ? true : item.read})), unread: state.unread - num}
		default:
			return state;
	}
}

export const getMsgList = () => {
	return (dispatch, getState) => {
		axios.get('/user/getMsgList').then(res => {
			if(res.status === 200 && res.data.code === 0) {
				const userId = getState().user._id;
				dispatch({type: MSG_LIST, data: res.data.data, users: res.data.users, userId: userId})
			}
		})
	}
}

export const recvMsg = () => {
	return (dispatch, getState) => {
		socket.on('recvmsg', (data) => {
			const userId = getState().user._id;
			dispatch({type: MSG_RECV, data: data, userId: userId})
		})
	}
}

export const sendMsg = ({from, to, msg}) => {
	return dispatch => {
		socket.emit('sendmsg', {from, to, msg})
	}
}

export const readMsg = (from) => {
	return (dispatch, getState) => {
		axios.post('/user/readMsg',{from}).then(res => {
			const userId = getState().user._id;
			if(res.status === 200 && res.data.code === 0) {
				dispatch({type: MSG_READ, data: {from, userId, num: res.data.num}})
			}
		})
	}
}
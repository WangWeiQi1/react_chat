import { createStore, applyMiddleware } from './woniu-redux'
import thunk from './woniu-redux-thunk'
import arrayThunk from './woniu-redux-array'

const ADD = 'ADD';
const REDUCE = 'REDUCE';
const YANSHI = 'YANSHI';

function counter(state=0,action) {
	switch(action.type) {
		case ADD:
			return state + 1;
		case REDUCE:
			return state - 1;
		case YANSHI:
			return state + 1;
		default:
			return 10;
	}
}

const store = createStore(counter, applyMiddleware(thunk, arrayThunk));

export const add = () => ({
	type: ADD
})

export const reduce = () => ({
	type: REDUCE
})

export const yanshi = () => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch({type: YANSHI})
		},2000)
	}
}

export const twice = () => {
	return [{type: ADD},{type: ADD}]
}

export default store;
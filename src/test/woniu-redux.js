//封装createStore
export function createStore(reducer, enhancer) {
	if(enhancer) {
		return enhancer(createStore)(reducer);
	}
	let currentState = {};
	let currentListeners = [];

	function getState() {
		return currentState;
	}

	function subscribe(listener) {
		currentListeners.push(listener);
	}

	function dispatch(action) {
	  	currentState = reducer(currentState,action);
	  	currentListeners.forEach(item=> item())
	  	return action;
	}
	
	dispatch({type: '@INITIAL/WANGWEIQI-REDUX'});
	return {
		getState,
		subscribe,
		dispatch
	}
}

export function applyMiddleware(...middlewares) {
	return createStore=>(...args) => {
		const store = createStore(...args);
		let dispatch = store.dispatch;
		const midApi = {
			getState: store.getState,
			dispatch: (...args) => dispatch(...args)
		}
		//支持多个中间件
		const middlewareChain = middlewares.map(middleware => middleware(midApi))
		dispatch = compose(...middlewareChain)(store.dispatch);
		// dispatch = middleware(midApi)(store.dispatch);
		return {
			...store,
			dispatch
		}
	}
}

//compose的作用就是依次调用函数数组里面的函数 类似fn1(fn2(fn(3)))
export function compose(...funcs) {
	if(funcs.length === 0) {
		return arg => arg
	}
	if(funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce((ret,item)=>(...args)=>ret(item(...args)))
}

//把传进来的函数数组遍历一下 然后把每个函数都dispatch
function bindActionCreator(creator, dispatch) {
	return (...args) => dispatch(creator(...args));
}
export function bindActionCreators(creators, dispatch) {
	let bound = {};
	Object.keys(creators).forEach(item => {
		let creator = creators[item];
		bound[item] = bindActionCreator(creator, dispatch);
	})
	return bound;
}
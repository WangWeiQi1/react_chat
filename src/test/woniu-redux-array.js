const arrayThunk = ({dispatch, getState}) => next => action => {
	// console.log(action, typeof action)
	//如果是数组 dispatch即可
	if(Array.isArray(action)) {
		return action.forEach(item=>dispatch(item));
	}
	//如果不是数组 直接调用下一个中间件 使用next
	return next(action)
}

export default arrayThunk;
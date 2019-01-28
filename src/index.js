import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './config'
import './index.css'

//迷你react-redux的实现
// import TestRedux from './test/index.js'
// import { Provider } from './test/woniu-react-redux'
// import store from './test/normal-redux'

// import Page from './test/context-demo'

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// ReactDOM.render(
// 	<Provider store={store}>
// 		<TestRedux />
// 	</Provider>,
// 	document.getElementById('root')
// );
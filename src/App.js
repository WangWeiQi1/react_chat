import React from 'react'

import {
	Provider
} from 'react-redux'
import store from './store'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './components/authroute'

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<AuthRoute />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
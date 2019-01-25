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
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import DashBoard from './components/dashboard'
import Chat from './components/chat'

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<AuthRoute />
						<Switch>
							<Route path='/bossinfo' component={BossInfo} />
							<Route path='/geniusinfo' component={GeniusInfo} />
							<Route path='/login' component={Login} />
							<Route path='/register' component={Register} />
							<Route path='/chat/:user' component={Chat} />
							<Route component={DashBoard} />
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
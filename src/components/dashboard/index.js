import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink'
import Boss from '../boss'
import Genius from '../genius'
import User from '../user'
import * as actionCreators from '../../redux/chat.redux'

function Msg() {
	return <h2>消息列表</h2>
}

class DashBoard extends React.Component {
	componentDidMount() {
		if(!this.props.chat.chatmsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}
	render() {
		const user = this.props.user;
		const { pathname } = this.props.location;
		const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide: user.type === 'genius'
			},
			{
				path: '/genius',
				text: 'Boss',
				icon: 'job',
				title: 'Boss列表',
				component: Genius,
				hide: user.type === 'boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
			}
		]
		return (
			<div>
				<NavBar className="fixed-header" mode="dark">{navList.find(item => item.path === pathname).title}</NavBar>
				<div className="page-content">
					<Switch>
						{
							navList.map((item) => {
								return <Route key={item.path} path={item.path} component={item.component} />
							})
						}
					</Switch>
				</div>
				<NavLinkBar className="fixed-footer" data={navList} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		chat: state.chat
	}
}

const mapDispatchToProps = (dispatch) => ({
	getMsgList() {
		dispatch(actionCreators.getMsgList())
	},
	recvMsg() {
		dispatch(actionCreators.recvMsg())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashBoard);
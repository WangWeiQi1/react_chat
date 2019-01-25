import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class NavLinkBar extends React.Component {
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render() {
		const navList = this.props.data.filter(v => !v.hide)
		const { pathname } = this.props.location;
		return (
			<TabBar>
				{
					navList.map((item) => {
						return (
							<TabBar.Item
								badge={item.path === '/msg' ? this.props.chat.unread : ''}
								key={item.path}
								title={item.text}
								icon={{uri: require(`./img/${item.icon}.png`)}}
								selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
								selected={pathname === item.path}
								onPress={() => {
									this.props.history.push(item.path)
								}}
							/>
						)
					})
				}
			</TabBar>
		)
	}
}

const mapStateToProps = (state) => ({
	chat: state.chat
})

export default connect(
	mapStateToProps,
	null
)(withRouter(NavLinkBar));
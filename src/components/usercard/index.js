import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component {
	static propTypes = {
		userList: PropTypes.array.isRequired
	}
	render() {
		const Header = Card.Header;
		const Body = Card.Body;
		return (
			<WingBlank>
				<WhiteSpace />
				{
					this.props.userList.map((item) => {
						return (
							item.avatar ? 
							<Card full key={item._id}>
								<Header
									title={item.user}
									thumb={require(`../img/${item.avatar}.png`)}
									extra={<span>{item.title}</span>}
								/>
								<Body>
									{
										item.type === 'boss' ?
										<div>公司：{item.company}</div> : null
									}
									<WhiteSpace />
									{
										item.desc.split('\n').map(item => (
											<div key={item}>{item}</div>
										))
									}
									<WhiteSpace />
									{
										item.type === 'boss' ?
										<div>薪资：{item.money}</div> : null
									}
								</Body>
							</Card> : null
						)
					})
				}
			</WingBlank>
		)
	}
}

export default UserCard;
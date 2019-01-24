import React from 'react'
import { connect } from 'react-redux'
import { Result, List, Button, Modal } from 'antd-mobile'
import cookies from 'browser-cookies'
import * as actionCreators from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

class User extends React.Component {
	handleLogout = () => {
		const alert = Modal.alert;
		alert('注销', '确定要退出登录吗???', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确认', onPress: () => {
          	cookies.erase('userId');
          	this.props.logout();
          }}
        ])
	}
	render() {
		const Item = List.Item;
		return (
			this.props.user.avatar ? (
				<div>
					<Result
				    img={<img src={require(`../img/${this.props.user.avatar}.png`)} style={{width: 50}} alt=""/>}
				    title={this.props.user.user}
				    message={this.props.user.company || ''}
				  />
				  <List renderHeader={() => (
				  	this.props.user.type === 'boss' ? '职位要求' : '求职意向'
				  )}>
						<Item
							multipleLine
						>
							{this.props.user.title}
						</Item>
				  </List>
				  <List renderHeader={() => (
						this.props.user.type === 'boss' ? '职位要求' : '个人简介'
				  )}>
				  	<Item
							multipleLine
						>
							{
								this.props.user.desc !== undefined && this.props.user.desc.split('\n').map((item) => {
									return <div key={item}>{item}</div>
								})
							}
						</Item>
				  </List>
				  {
				  	this.props.user.type === 'boss' ?
				  	<List renderHeader={() => '薪资情况'}>
							<Item
								multipleLine
							>
								{
									this.props.user.money ? 
									<div>{this.props.user.money}</div> : ''
								}
							</Item>
					  </List> : null
				  }
				  <List>
				  	<Button type="primary" style={{zIndex: 1}} onClick={this.handleLogout}>退出登录</Button>
				  </List>
				</div>) : <Redirect to={this.props.user.redirectTo} />
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => {
	return {
		logout() {
			dispatch(actionCreators.logout())
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);
import React from 'react'
import Logo from '../../components/logo'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
	state = {
		user: '',
		pwd: ''
	}
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	handleRegister = () => {
		this.props.history.push('/register');
	}
	render() {
		return (
			<div>
				{this.props.user.redirectTo && this.props.user.redirectTo !== '/login' ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				<WingBlank>
					<List>
						{this.props.user.msg ? <p className="error-msg">{this.props.user.msg}</p> : null}
						<InputItem
							onChange={(val) => {this.handleChange('user',val)}}
						>
							用户
						</InputItem>
						<WhiteSpace />
						<InputItem
							type="password"
							onChange={(val) => {this.handleChange('pwd',val)}}
						>
						密码
						</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.props.handleLogin(this.state)}>登录</Button>
					<WhiteSpace />
					<Button onClick={this.handleRegister} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogin(state) {
			dispatch(actionCreators.doLogin(state))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);
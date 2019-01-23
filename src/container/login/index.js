import React from 'react'
import Logo from '../../components/logo'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'

class Login extends React.Component {
	handleRegister = () => {
		this.props.history.push('/register');
	}
	render() {
		return (
			<div>
				<Logo />
				<WingBlank>
					<List>
						<InputItem>用户</InputItem>
						<WhiteSpace />
						<InputItem>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary">登录</Button>
					<WhiteSpace />
					<Button onClick={this.handleRegister} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login;
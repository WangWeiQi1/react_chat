import React from 'react'
import './index.css'
import Logo from '../../components/logo'
import {
	List,
	InputItem,
	WhiteSpace,
	Button,
	Radio
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreators from '../../redux/user.redux'
import imoocForm from '../../components/imooc-form'

class Register extends React.Component {
	componentDidMount() {
		this.props.handleChange('type', 'genius');
	}
	handleSubmit = () => {
		this.props.register(this.props.state)
	}
	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} /> : null}
				<Logo />
				<List>
					{this.props.user.msg ? <p className="error-msg">{this.props.user.msg}</p> : null}
					<InputItem
						onChange={(val) => {this.props.handleChange('user',val)}}
					>
						用户名
					</InputItem>
					<WhiteSpace />
					<InputItem
						type="password"
						onChange={(val) => {this.props.handleChange('pwd',val)}}
					>
						密码
					</InputItem>
					<WhiteSpace />
					<InputItem
						type="password"
						onChange={(val) => {this.props.handleChange('repeatpwd',val)}}
					>
						确认密码
					</InputItem>
					<WhiteSpace />
					<RadioItem 
						onChange={() => {this.props.handleChange('type','genius')}}
						checked={this.props.state.type === 'genius'}
					>
						牛人
					</RadioItem>
					<RadioItem 
						onChange={() => {this.props.handleChange('type','boss')}}
						checked={this.props.state.type === 'boss'}
					>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleSubmit}>注册</Button>
				</List>
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
		register(state) {
			dispatch(actionCreators.register(state))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(imoocForm(Register));
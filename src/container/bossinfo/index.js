import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/user.redux'

class BossInfo extends React.Component {
	state = {
		title: '',
		desc: '',
		company: '',
		money: ''
	}
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}
	render() {
		const path = this.props.location.pathname;
		const redirect = this.props.user.redirectTo;
		return (
			<div className="write-info">
			  { redirect && redirect !== path ? <Redirect to={this.props.user.redirectTo} /> : null }
			  <NavBar mode="dark">BOSS完善信息</NavBar>
			  <AvatarSelector 
			  	selectAvatar={(text) => {
			  		this.setState({
			  			avatar: text
			  		})
			  	}}
			  />
			  <InputItem
				onChange={(val) => {this.handleChange('title', val)}}
			  >
			  	招聘职位
			  </InputItem>
			  <InputItem
				onChange={(val) => {this.handleChange('company', val)}}
			  >
			  	公司名称
			  </InputItem>
			  <InputItem
				onChange={(val) => {this.handleChange('money', val)}}
			  >
			  	职位薪资
			  </InputItem>
			  <TextareaItem
				onChange={(val) => {this.handleChange('desc', val)}}
				rows={3}
				autoHeight
				title="职位要求"
			  />
			  <Button 
			  	onClick={() => {this.props.update(this.state)}}
			  	type="primary"
			  >保存</Button>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = (dispatch) => {
	return {
		update(state) {
			dispatch(actionCreators.updateInfo(state))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BossInfo);
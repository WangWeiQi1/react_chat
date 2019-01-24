import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/user.redux'

class GeniusInfo extends React.Component {
	state = {
		title: '',
		desc: ''
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
			  <NavBar mode="dark">牛人完善信息</NavBar>
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
			  	求职岗位
			  </InputItem>
			  <TextareaItem
				onChange={(val) => {this.handleChange('desc', val)}}
				rows={3}
				autoHeight
				title="个人简介"
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
)(GeniusInfo);
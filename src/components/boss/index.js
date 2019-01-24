import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/card.redux'
import UserCard from '../usercard'

class Boss extends React.Component {
	state = {}
	componentDidMount() {
		this.props.getList(this.props.userList,'genius');
	}
	render() {
		return (
			<UserCard userList={this.props.userList} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userList: state.card.userList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getList(userList, type) {
			userList.length === 0 && dispatch(actionCreators.getUserList(type))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Boss);
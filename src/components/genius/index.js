import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/card.redux'
import UserCard from '../usercard'

class Genius extends React.Component {
	state = {}
	componentDidMount() {
		this.props.getList('boss');
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
		getList(type) {
			dispatch(actionCreators.getUserList(type))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Genius);
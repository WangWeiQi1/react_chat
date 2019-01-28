import React from 'react'
import { connect } from './woniu-react-redux'
import { add, reduce, yanshi, twice } from './normal-redux'

class TestRedux extends React.Component {
	render() {
		return (
			<div>
				<div>{this.props.num}</div>
				<button onClick={this.props.add}>add</button>
				<button onClick={this.props.reduce}>reduce</button>
				<button onClick={this.props.yanshi}>延时增长</button>
				<button onClick={this.props.twice}>增加2个</button>
			</div>
		)
	}
}

export default connect(
	(state)=>({num: state}),
	{ add, reduce, yanshi, twice }
)(TestRedux);
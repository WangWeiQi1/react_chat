//context是全局的 组件里声明 所有子元素可以直接取到
import React from 'react'
import PropTypes from 'prop-types'

class SliderBar extends React.Component {
	render() {
		return (
			<div>
				<h1>SliderBar</h1>
				<NavBar />
			</div>
		)
	}
}

class NavBar extends React.Component {
	//在接受的子组件里面必须定义contextTypes
	//才能取到父组件context里面的值
	static contextTypes = {
		user: PropTypes.string
	}
	render() {
		console.log(this.context)
		return (
			<h1>{this.context.user}的NavBar</h1>
		)
	}
}

class Page extends React.Component {
	//只要使用getChildContext
	//必须定义childContextTypes
	static childContextTypes = {
		user: PropTypes.string
	}
	constructor(props) {
		super(props);
		this.state = {user: 'wangweiqi'}
	}
	getChildContext() {
		return this.state;
	}
	render() {
		return (
			<div>
				<h1>{this.state.user}</h1>
				<SliderBar />
			</div>
		)
	}
}

export default Page;
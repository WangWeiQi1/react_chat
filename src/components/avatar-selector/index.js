import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}
	state = {

	}
	render() {
		const avatarList = 'boy,man,girl,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(item => ({
													icon: require(`../img/${item}.png`),
													text: item
												}))
		const gridHeader = this.state.icon ? 
											 <div>
											 	<span>已选择头像</span>
											 	<img style={{width: 20}} src={this.state.icon} alt=""/>
											 </div> : '请选择头像'
		return (
			<div>
				<List renderHeader={() => gridHeader}>
					<Grid 
						data={avatarList} 
						columnNum={5}
						onClick={(el) => {
							this.setState(el);
							this.props.selectAvatar(el.text)}
						}
					/>
				</List>
			</div>
		)
	}
}

export default AvatarSelector;
import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

class Msg extends React.Component {
	getLast(arr) {
		return arr[arr.length - 1]
	}

	render() {
		const Item = List.Item;
		const Brief = Item.Brief;
		const userId = this.props.user._id;
		const msgGroup = {};
		//按照聊天用户分组，根据chatId
		this.props.chat.chatmsg.forEach(item => {
			msgGroup[item.chatId] = msgGroup[item.chatId] || [];
			msgGroup[item.chatId].push(item);
		})
		console.log(msgGroup)
		const chatList = Object.values(msgGroup).sort((a,b) => {
			const a_last = this.getLast(a).create_time;
			const b_last = this.getLast(b).create_time;
			return b_last - a_last;
		})
		return (
			<div>
				<List>
					{
						chatList.map(item => {
							const lastItem = this.getLast(item);
							const targetId = item[0].from === userId ? item[0].to : item[0].from;
							const unreadNum = item.filter(val => !val.read && val.to === userId).length;
							return (
								<Item
									extra={<Badge text={unreadNum} />}
									arrow="horizontal"
									style={{borderBottom: "1px solid #ccc"}}
									key={lastItem._id}
									thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
									onClick={() => {this.props.history.push(`/chat/${targetId}`)}}
								>
									{this.props.chat.users[targetId].name}
									<Brief><span dangerouslySetInnerHTML={{__html: lastItem.content}}></span></Brief>
								</Item>
							)
						})
					}
				</List>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	chat: state.chat,
	user: state.user
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Msg);
import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import * as actionCreators from '../../redux/chat.redux'
import { getChatId } from '../../utils/utils'

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			msg: []
		}
	}
	componentDidMount() {
		if(!this.props.state.chat.chatmsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}

	handleSubmit() {
		const from = this.props.state.user._id;
		const to = this.props.match.params.user;
		const msg = this.state.text;
		this.props.sendMsg({from, to, msg});
		this.setState({text: ''});
	}
	render() {
		const emoji = '❤ 😂 😍 🔥 🤔 😊 👍 ✔ 😘 ☺ 😀 😂'.split(' ').filter(v=>v).map(v=>({text: v}));
		const userId = this.props.match.params.user;
		const Item = List.Item;
		const users = this.props.state.chat.users;
		if(!users[userId]) {
			return null;
		}
		const chatId = getChatId(userId, this.props.state.user._id);
		const chatmsgs = this.props.state.chat.chatmsg.filter(item=>item.chatId === chatId);
		return (
			<div id="chat-page">
				<NavBar
					mode="dark"
					icon={<Icon type="left" />}
					onLeftClick={() => {
						this.props.history.goBack();
					}}
				>
					{users[userId].name}
				</NavBar>
				{
					chatmsgs.map((item) => {
						const avatar = require(`../img/${users[item.from].avatar}.png`);
						return item.from === userId ? (
							<List key={item._id}>
								<Item
									thumb={avatar}
								>
									{item.content}
								</Item>
							</List>
						) : (
							<List key={item._id}>
								<Item 
									extra={<img src={avatar} alt=""/>}
									className="chat-me"
								>
									{item.content}
								</Item>
							</List>
						)
					})
				}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder="请输入聊天信息"
							value={this.state.text}
							onChange={(val) => {
								this.setState({
									text: val
								})
							}}
							extra={<span onClick={() => this.handleSubmit()}>发送</span>}
						>
						</InputItem>
					</List>
					<Grid 
						data={emoji}  
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	state: state
})

const mapDispatchToProps = (dispatch) => ({
	getMsgList() {
		dispatch(actionCreators.getMsgList());
	},
	sendMsg(msg) {
		dispatch(actionCreators.sendMsg(msg));
	},
	recvMsg() {
		dispatch(actionCreators.recvMsg())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
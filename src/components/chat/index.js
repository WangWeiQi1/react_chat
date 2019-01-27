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
			msg: [],
			showEmoji: false,
			desc: ''
		}
	}
	componentDidMount() {
		if(!this.props.state.chat.chatmsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
		/*解决antd-mobile 宫格组件跑马灯效果的bug*/
		// setTimeout(() => {
		// 	window.dispatchEvent(new Event('resize'));
		// },0)
		
	}
	componentWillUnmount() {
		const to = this.props.match.params.user;
		this.props.readMsg(to);
	}

	handleSubmit() {
		const from = this.props.state.user._id;
		const to = this.props.match.params.user;
		const msg = this.state.text.replace(/\#[0-9]{1,3}\;/gi, (item) => {
			let word = item.replace(/\#|\;/gi,'');
			return `<img src='https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${word}.gif' alt='' />`
		})
		this.props.sendMsg({from, to, msg});
		this.setState({text: ''});
		this.setState({desc: ''});
	}
	handleToggleShowEmoji = () => {
		this.setState({
			showEmoji: !this.state.showEmoji
		})
		/*解决antd-mobile 宫格组件跑马灯效果的显示隐藏高度计算错误的bug*/
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		},0)
	}
	selectEmoji(el, index) {
		this.setState({
			text: this.state.text + `#${el.desc};`
		})
	}

	render() {
		const emoji = ['0','1','2','3','4','5','6','7','8','9',
		              '10','11','12','13','14','15','16','17',
		              '18','19','20','21','22','23','24','25',
		              '26','27','28','29','30','31','32','33',
		              '34','35','36','37','38','39','40','41',
		              '42','43','44','45','46','47','48','49',
		              '50','51','52','53','54']
		              .map((item) => {
						return {
					      icon: require(`./img/${item}.gif`),
					      desc: item
					  }
		})
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
									<span dangerouslySetInnerHTML={{__html: item.content}}></span>
								</Item>
							</List>
						) : (
							<List key={item._id}>
								<Item 
									extra={<img src={avatar} alt=""/>}
									className="chat-me"
								>
									<span dangerouslySetInnerHTML={{__html: item.content}}></span>
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
							extra={
								<div>
									<img onClick={this.handleToggleShowEmoji} className="moren" src={require('./moren.png')} alt=""/>
									<span className="sendBtn" onClick={() => this.handleSubmit()}>发送</span>
								</div>
							}
						>
						</InputItem>
					</List>
					{
						this.state.showEmoji ? 
						<Grid 
							data={emoji}  
							columnNum={8}
							hasLine={false}
							isCarousel={true}
							carouselMaxRow={4}
							onClick={(el, index) => this.selectEmoji(el, index)}
						/> : null
					}
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
	},
	readMsg(to) {
		dispatch(actionCreators.readMsg(to))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
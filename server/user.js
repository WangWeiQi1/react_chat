const express = require('express');

const Router = express.Router();

const utils = require('utility');

const model = require('./model');

const User = model.getModel('user');

const Chat = model.getModel('chat');

const _filter = {pwd: 0, __v: 0}

Router.get('/list', (req,res) => {
	const type = req.query.type;
	// User.remove({},(e,d) => {})
	User.find({type}, (err, doc) => {
		return res.json({code: 0,data: doc})
	})
})

Router.get('/getMsgList', (req,res) => {
	const userId = req.cookies.userId;
	// Chat.remove({},(e,d) => {})
	User.find({}, (err, doc) => {
		let users = {};
		doc.forEach((item) => {
			users[item._id] = {name: item.user, avatar: item.avatar}
		})
		Chat.find({'$or': [{from: userId}, {to: userId}]}, (err, doc) => {
			if(!err) {
				return res.json({code: 0, data: doc, users: users})
			}
		})
	})
})

Router.post('/readMsg', (req,res) => {
	const userId = req.cookies.userId;
	const { from } = req.body;
	Chat.update(
		{from,to: userId},
		{'$set': {read: true}}, 
		{'multi': true}, //加上这个可以更新多行 否则只更新一行
		(err,doc) => {
		if(!err) {
			return res.json({code: 0, num: doc.nModified});
		}
		return res.json({code: 0, msg: '修正失败'});
	})
})

Router.post('/updateInfo', (req,res) => {
	const id = req.cookies.userId;
	const body = req.body;
	if(!id) {
		return res.json({code: 1, msg: '未登录'})
	}
	User.findByIdAndUpdate(id,body,(err, doc) => {
		if(err) {
			return res.json({
				code: 2,
				msg: '服务器好像发生了点小问题'
			});
		}
		const data = Object.assign({},{
			user: doc.user,
			type: doc.type
		},body)
		return res.json({code: 0, data: data})
	})
})

Router.post('/login', (req,res) => {
	const {user, pwd} = req.body;
	User.findOne({user: user}, (err, doc) => {
		if(!doc) {
			return res.json({
				code: 1,
				msg: '用户名不存在'
			})
		}
		if(md5Pwd(pwd) !== doc.pwd) {
			return res.json({
				code: 2,
				msg: '请检查您的密码'
			})
		}
		res.cookie('userId', doc._id);
		return res.json({
			code: 0,
			data: doc,
			msg: '登陆成功'
		})
	})
})

Router.post('/register', (req,res) => {
	const {user,pwd,type} = req.body;
	User.findOne({user: user}, (err,doc) => {
		if(doc) {
			return res.json({
				code: 1,
				msg: '用户名重复'
			})
		}
		new User({
			user,
			pwd: md5Pwd(pwd),
			type
		}).save((err, doc) => {
			if(err) {
				return res.json({
					code: 2,
					msg: '服务器好像发生了点小问题'
				});
			}
			const { user, type, _id } = doc;
			res.cookie('userId', _id);
			return res.json({
				code: 0,
				data: {user, type, _id},
				msg: '注册成功'
			})
		})
	})
})

Router.get('/info', (req, res) => {
	const { userId } = req.cookies;
	if(!userId) {
		return res.json({code: 2, msg: '未登录'});
	}
	User.findOne({_id: userId}, _filter, (err, doc) => {
		if(err) {
			return res.json({
				code: 1,
				msg: '服务器好像发生了点小问题'
			})
		}
		return res.json({
			code: 0,
			data: doc
		})
	})
})

function md5Pwd(pwd) {
	const salt = 'nihao_wwq_wan_ztt@123%$^*';
	return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
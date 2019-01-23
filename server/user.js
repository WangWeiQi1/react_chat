const express = require('express');

const Router = express.Router();

const utils = require('utility');

const model = require('./model');

const User = model.getModel('user');

Router.get('/list', (req,res) => {
	User.find({}, (err, doc) => {
		return res.json(doc)
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
		User.create({user,pwd: md5Pwd(pwd),type}, (err,doc) => {
			if(err) {
				return res.json({
					code: 2,
					msg: '服务器好像发生了点小问题'
				});
			}
			return res.json({
				code: 0,
				msg: '注册成功'
			})
		})
	})
})

Router.get('/info', (req, res) => {
	return res.json({
		code: 1
	})
})

function md5Pwd(pwd) {
	const salt = 'nihao_wwq_wan_ztt@123%$^*';
	return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
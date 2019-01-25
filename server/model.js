const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/chat';

mongoose.connect(DB_URL);

const models = {
	user: {
		user: {
			type: String,
			require: true
		},
		pwd: {
			type: String,
			require: true
		},
		type: {
			type: String,
			require: true
		},
		avatar: String,
		desc: String,
		title: String,
		company: String,
		money: String
	},
	chat: {
		chatId: {
			type: String,
			require: true
		},
		from: {
			type: String,
			require: true
		},
		to: {
			type: String,
			require: true
		},
		read: {
			type: Boolean,
			default: false
		},
		content: {
			type: String,
			require: true,
			default: ''
		},
		create_time: {
			type: Number,
			default: new Date().getTime()
		}
	}
}

for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: (name) => {
		return mongoose.model(name)
	}
}
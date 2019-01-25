import { combineReducers } from 'redux'

import { user } from '../redux/user.redux'

import { card } from '../redux/card.redux'

import { chat } from '../redux/chat.redux'

const reducer = combineReducers({user, card, chat});

export default reducer;

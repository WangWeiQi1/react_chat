import { combineReducers } from 'redux'

import { user } from '../redux/user.redux'

import { card } from '../redux/card.redux'

const reducer = combineReducers({user, card});

export default reducer;

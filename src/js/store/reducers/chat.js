import { ADD_MESSAGE, CLEAR_MESSAGE } from '../types';

const initialState = { messages: [] };

export function chat(state = initialState, action) {
	switch (action.type) {
		case ADD_MESSAGE:
			const message = action.payload;
			return Object.assign({}, state, {
				messages: [...state.messages, message],
			});
		case CLEAR_MESSAGE:
			return Object.assign({}, state, { messages: [] });
		default:
			return state;
	}
}

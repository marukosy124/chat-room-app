import {
	CONNECT,
	DISCONNECT,
	SEND,
	RECEIVE,
	ADD_MESSAGE,
	CLEAR_MESSAGE,
} from './types';
import { io } from 'socket.io-client';

let user;
const socket = io('http://localhost:5000');

export default function middleware({ dispatch }) {
	return function (next) {
		return function (action) {
			switch (action.type) {
				case CONNECT:
					user = JSON.parse(sessionStorage.getItem('user'));
					socket.emit('join_room', user);
					// send join message
					const join_message = {
						sender: 'system',
						content: `${user.username} joined`,
						room: user.room,
					};
					socket.emit('send_message', join_message);
					dispatch({ type: ADD_MESSAGE, payload: join_message });
					break;

				case DISCONNECT:
					// send disconnect message
					const disconnect_message = {
						sender: 'system',
						content: `${user.username} left`,
						room: user.room,
					};
					socket.emit('send_message', disconnect_message);
					dispatch({ type: ADD_MESSAGE, payload: disconnect_message });
					// clear messages
					dispatch({ type: CLEAR_MESSAGE });
					// disconnect
					socket.on('disconnect');
					break;

				case SEND:
					socket.emit('send_message', action.payload);
					dispatch({ type: ADD_MESSAGE, payload: action.payload });
					break;

				case RECEIVE:
					socket.on('receive_message', (data) => {
						dispatch({ type: ADD_MESSAGE, payload: data });
					});
					break;

				default:
					break;
			}

			return next(action);
		};
	};
}

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import { ioConnect, ioSend, ioDisconnect, ioRecv } from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const mapState = (state) => ({
	messages: state.chat.messages,
});

const mapDispatch = {
	connect: ioConnect,
	disconnect: ioDisconnect,
	send: ioSend,
	recv: ioRecv,
};

const connector = connect(mapState, mapDispatch);

const ChatPage = (props) => {
	const [message, setMessage] = useState({ sender: '', content: '', room: '' });
	const { username, room } = JSON.parse(sessionStorage.getItem('user'));

	useEffect(() => {
		props.connect('http://localhost:5000');
		if (username && room) {
			setMessage({ sender: username, content: '', room: room });
      // receive message
			props.recv();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = (e) => {
		e.preventDefault();
    // disconnect first before sessionStorage is cleared
		props.disconnect();
		sessionStorage.removeItem('user');
		props.history.push('/login');
	};

	const handleOnChange = (e) => {
		setMessage({ ...message, content: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (message) {
			props.send(message);
			setMessage({ ...message, content: '' });
			// Scroll message window to bottom
			let messageWindow = document.getElementById('message-window');
			messageWindow.scrollTop = messageWindow.scrollHeight;
		}
	};

	return (
		<div className="chat page">
			<div className="header">
				<h2>{room}</h2>
				<Button onClick={logout} color="component">
					<FontAwesomeIcon icon={faSignOutAlt} className="icon" size="lg" />
				</Button>
			</div>
			<div id="message-window" className="message-window">
				{props.messages.map((message, i) => {
					if (message.sender === 'system') {
						return (
							<div className="system-message" key={i}>
								<p>{message.content}</p>
							</div>
						);
					} else if (message.sender === username) {
						return (
							<div className="sent-message" key={i}>
								<p>{message.content}</p>
							</div>
						);
					} else {
						return (
							<div className="received-message" key={i}>
								<div className="sender">{message.sender}</div>
								<p>{message.content}</p>
							</div>
						);
					}
				})}
			</div>
			<Form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="message-input"
			>
				<Input
					onChange={handleOnChange}
					value={message.content}
					name="message"
				/>
				<Button type="submit" outline>
					Send
				</Button>
			</Form>
		</div>
	);
};

export default withRouter(connector(ChatPage));

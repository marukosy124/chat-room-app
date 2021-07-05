import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Form, Input, Button, FormGroup } from 'reactstrap';

const LoginPage = (props) => {
	const [info, setInfo] = useState({ username: '', room: '' });
	const [error, setError] = useState('');

	const handleOnChange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};

	const login = (e) => {
		e.preventDefault();
		const username = info.username;
		const room = info.room;
		if (!username) {
			setError('Enter a name to enter chat room.');
			return;
		}
		if (!room) {
			setError('Enter a room to enter.');
			return;
		}
		sessionStorage.setItem('user', JSON.stringify(info));
		setInfo({ username: '', room: '' });
	};

	let { from } = props.location.state || { from: { pathname: '/' } };
	if (sessionStorage.getItem('user')) return <Redirect to={from} />;

	return (
		<div className="login-page page">
			<Form className="login-form" onSubmit={login}>
				<FormGroup>
					<Input
						onChange={handleOnChange}
						name="username"
						placeholder="Username"
					/>
				</FormGroup>
				<FormGroup>
					<Input onChange={handleOnChange} name="room" placeholder="Room" />
				</FormGroup>
				<p className="error-message">{error}</p>
				<Button onClick={login} color="component" type="submit">
					Enter Chat Room
				</Button>
			</Form>
		</div>
	);
};

export default withRouter(LoginPage);

import React, { useState } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import styles from '../global-styles';

// Function Component
interface LoginProp {
	navigation: any;
}
function LoginComponent({ navigation }: LoginProp) {
	let [error, setError] = useState({ message: '' });

	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);

	const dispatch = useDispatch();

	function submitForm() {
		userService
			.login(user)
			.then((user) => {
				console.log(user);
				/*
                When logged in, a new user with the same credentials is created. 
                That way, when we click the back to the home page, the previous user is no longer logged in.
            */

				dispatch(getUser(user));
				navigation.navigate('Home');
			})
			.catch((err) => setError({ message: err.message }));
	}

	function registerForm() {
		navigation.navigate('Register');
	}

	return (
		<View style={styles.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Text style={styles.label}>Username: </Text>
			<TextInput
				style={styles.input}
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={styles.label}>Password: </Text>
			<TextInput
				secureTextEntry={true}
				style={styles.input}
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Button onPress={submitForm} title="Login" />
			<Button onPress={registerForm} title="Register" />
		</View>
	);
}

export default LoginComponent;

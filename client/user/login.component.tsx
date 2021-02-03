import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import styles from '../global-styles';
import { User } from './user';

// Function Component
interface LoginProp {
	navigation: any;
}
function LoginComponent({ navigation }: LoginProp) {
	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);

	const dispatch = useDispatch();

	function submitForm() {
		userService.login(user).then((user) => {
			console.log(user);
			/*
                When logged in, a new user with the same credentials is created. 
                That way, when we click the back to the home page, the previous user is no longer logged in.
            */
			let newUser = new User();
			newUser.username = user.username;
			newUser.password = user.password;
			newUser.role = user.role;
			dispatch(getUser(newUser));
			console.log(newUser);
			navigation.navigate('Home'); //*
		});
	}
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder ='username'
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, username: value }))
				}
				value={user.username}
			/>
			<TextInput
				placeholder='password'
				secureTextEntry={true}
				style={styles.input}
				onChangeText={(value: any) =>
					dispatch(loginAction({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Button onPress={submitForm} title="Login"  />
		</View>
	);
}

export default LoginComponent;

import React from 'react';
import userService from './user.service';
import { useDispatch } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser } from '../store/actions';
import { Button, Text, View, Platform } from 'react-native';
import style from '../global-styles';
import styles from '../global-styles';
import { User } from './user';

const { create } = require('react-native-pixel-perfect');
const designResolution = {
	width: 1125,
	height: 2436,
}; // what we're designing for
const perfectSize = create(designResolution);

// Function Component
interface LogoutProp {
	navigation: any;
}

function LogoutComponent({ navigation }: LogoutProp) {
	const dispatch = useDispatch();

	function submitForm() {
<<<<<<< HEAD
		// userService.login(user).then((user) => {
		// 	console.log(user);
		// 	/*
        //         When logged in, a new user with the same credentials is created. 
        //         That way, when we click the back to the home page, the previous user is no longer logged in.
        //     */
		// 	let newUser = new User();
		// 	newUser.username = user.username;
		// 	newUser.password = user.password;
		// 	newUser.role = user.role;
		// 	dispatch(getUser(newUser));
		// 	console.log(newUser);
		// 	navigation.navigate('Home'); //*
        // });
        userService.logout().then( (user) => {
            console.log(`user: ${user}`);
            navigation.navigate('Login')
		})
		user.username = '';
		user.password = '';
		user.role = '';
		user.credits = 0;
		user.playlist = undefined;
		user.favorites = undefined;
=======
		userService.logout().then((res) => {
			console.log(`user: ${res}`);
			navigation.navigate('Login');
		});
>>>>>>> 2323c5f5207eb083a4fbee896542a59b13717a2f
		console.log('Logged out');
		dispatch(getUser(new User()));
	}

	function stayLoggedIn() {
		navigation.navigate('Home');
	}

	return (
		<View style={style.container}>
			<Text style={styles.label}>Are you sure you want to log out?</Text>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
				}}
			>
				<Button onPress={submitForm} title="Logout" />
			</View>
			<View
				style={{
					margin: Platform.OS === 'web' ? perfectSize(40) : perfectSize(80),
					marginTop: 0,
				}}
			>
				<Button onPress={stayLoggedIn} title="Cancel" />
			</View>
		</View>
	);
}

export default LogoutComponent;

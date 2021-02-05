import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View, Alert } from 'react-native';
import style from '../global-styles';
import { User } from './user';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Function Component
interface LogoutProp {
	navigation: any;
}

function LogoutComponent({ navigation }: LogoutProp) {
	const userSelector = (state: UserState) => state.loginUser;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	function submitForm() {
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
            console.log(user);
            navigation.navigate('Login')
        })

        const alert = () => {
            Alert.alert('You have been logged out');
        }
	}
	return (
        <TouchableOpacity onPress = {alert}>
            <Text>Logout of Music Mania</Text>
        </TouchableOpacity>
	);
}

export default LogoutComponent;

import React, {useState, useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {User} from './user';
import { addUser } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';

interface RegisterProp{
    navigation: any;
}
function RegisterComponent({navigation}:RegisterProp) {
	const userSelector = (state: UserState) => state.userInput;
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const registrationForm = () => {
        userService.addUser(user).then((user) => {
			console.log(user);
			/*
                When logged in, a new user with the same credentials is created. 
                That way, when we click the back to the home page, the previous user is no longer logged in.
            */
			let newUser = new User();
			newUser.username = user.username;
			newUser.password = user.password;
			newUser.role = user.role;
			dispatch(addUser(newUser));
			console.log(newUser);
			navigation.navigate('Home');
		});
	}

	return (
		<View style={style.container}>
			<Text style={style.label}>Username: </Text>
			<TextInput
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={style.label}>Password: </Text>
			<TextInput
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Button onPress={registrationForm} title="Submit" />
		</View>
	);
}

export default RegisterComponent;

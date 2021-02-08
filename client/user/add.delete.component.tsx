import React, { useState, useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
//import {useHistory} from 'react-router-dom';
import { getUser, loginAction } from '../store/actions';
import { Button, TextInput, Text, View } from 'react-native';
import style from '../global-styles';
import { addUser } from '../store/actions';

interface RegisterEmpProp {
	navigation: any;
}

function AddDeleteUserComponent({navigation}: RegisterEmpProp) {
	const [error, setError] = useState({ message: '' });
	const userSelector = (state: UserState) => state.userInput;
	const user = useSelector(userSelector);
	const userContext = useSelector((state: UserState) => state.user);
	const dispatch = useDispatch();

	const AddUserForm = () => {
		userService
			.addUser({ username: user.username, password: user.password, role: user.role})
			.then((res) => navigation.navigate('Home'))
			.catch((err) => setError({ message: err.message }));
	};

	const handleDelete = () => {
		userService.deleteByUsername(user.username).then(() => {});
	};

	return (
		<View style={style.container}>
			{error.message !== '' && (
				<Text style={{ color: 'red' }}>{error.message}</Text>
			)}
			<Text style={style.label}>Username: </Text>
			<TextInput
				placeholder="Enter Username"
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, username: value }))
				}
				value={user.username}
			/>
			<Text style={style.label}>Password: </Text>
			<TextInput
				placeholder="Enter Password"
				secureTextEntry={true}
				style={style.input}
				onChangeText={(value: any) =>
					dispatch(addUser({ ...user, password: value }))
				}
				value={user.password}
			/>
			<Text style={style.label}>Role: </Text>
			<TextInput
				placeholder="employee"
				style={style.input}
				onChangeText={(value: any) => 
					dispatch(addUser({...user, role: value}))
				}
				value = {user.role}
			/>
			<br></br>
			<Button onPress={AddUserForm} title="Register New Employee" />
			<br></br>
			{userContext.role === 'admin' && (<Button onPress={handleDelete} title="Remove User" />)}
		</View>
	);
}
export default AddDeleteUserComponent;
